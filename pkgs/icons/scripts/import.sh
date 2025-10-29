#!/usr/bin/env bash

set -eo pipefail

variant="fontawesome-pro"
styles=("brands" "light" "regular" "solid")
out_dir="./dist"
tmp_dir="./tmp"

echo -e "⚡️ Importing latest Font Awesome\n"

fontawesome_token="$(fnox get FONTAWESOME_PACKAGE_TOKEN)"

if [ -z "$fontawesome_token" ]; then
  echo "🔴 FONTAWESOME_PACKAGE_TOKEN is not available. Please make sure to configure fnox."
  exit 1
fi

# Navigate to the pkg root to activate .npmrc
root_dir="$(dirname "$0")/.."

version_hash="$(cat .fontawesomerc | sha256sum | cut -c1-8)"
echo "🔵 Version hash: $version_hash"

pkg_name="@fortawesome/$variant"
versioned_name="$variant-$version_hash"
tarball_path="$tmp_dir/$versioned_name.tgz"
files_path="$tmp_dir/$versioned_name"

mkdir -p "$tmp_dir"

tarball_url="$(env FONTAWESOME_PACKAGE_TOKEN="$fontawesome_token" pnpm view "$pkg_name" --json --no-workspaces | jaq -r ".dist.tarball")"
tarball_name=$(basename "$tarball_url")

if [ -f "$tarball_path" ]; then
  echo "🔵 $tarball_path already downloaded"
else
  echo "🔵 Downloading $pkg_name from $tarball_url..."
  curl -L \
    -sSfL \
    -H "Authorization: Bearer $fontawesome_token" \
    "$tarball_url" \
    -o "$tarball_path" > /dev/null
fi

echo "🔵 Extracting to $tarball_path..."

mkdir -p "$files_path"
tar -xzf "$tarball_path" -C "$files_path" --strip-components=1

echo "🔵 Copying svgs to $out_dir..."
rm -rf "$out_dir"
mkdir -p "$out_dir"

for style in "${styles[@]}"; do
  cp -r "$files_path/svgs-full/$style/" "$out_dir"
done

echo "🔵 Cleaning up..."
rm -rf "$files_path"

echo -e "\n💚 Font Awesome imported successfully!"