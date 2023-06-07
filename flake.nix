{
  # leveraging 22.11 to get node 16
  # TODO: After GHA updates to newer node we can bump nixos release
  inputs.nixpkgs.url = "nixpkgs/nixos-22.11";

  outputs = flakes @ { self, nixpkgs }:
    let
      # System types to support.
      supportedSystems = [ "x86_64-linux" "aarch64-darwin" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = f: nixpkgs.lib.genAttrs supportedSystems (system: f system);

      # Nixpkgs instantiated for supported system types.
      nixpkgsFor = forAllSystems
        (system: import nixpkgs {
          inherit system; overlays = [ ];
          config = { allowUnfree = true; };
        });
    in
    {

      devShells = forAllSystems
        (system:
          let
            pkgs = nixpkgsFor.${system};
          in
          {
            default = pkgs.mkShell {
              buildInputs = with pkgs;[
                nodejs-16_x
                yarn
                jq
              ];

              shellHook = ''
                PATH="$PWD/node_modules/.bin:$PATH"
                alias scripts='jq ".scripts" package.json'
              '';
            };
          });

    };
  # Bold green prompt for `nix develop`
  # Had to add extra escape chars to each special char
  nixConfig.bash-prompt = "\\[\\033[01;32m\\][nix-flakes \\W] \$\\[\\033[00m\\] ";
}
