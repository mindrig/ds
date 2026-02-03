#!/usr/bin/env bash

echo -e "⚡️ Importing latest Font Awesome\n"

source "$(dirname "$0")/_env.sh" --cd-root

if [ -f "$dist_version_path" ] && [ "$(cat "$dist_version_path")" = "$version_hash" ]; then
	echo "🟢 Dist already at version $version_hash, skipping import"
	exit 0
fi

variant="fontawesome-pro"
styles=("brands" "light" "regular" "solid")
dist_dir_path="./dist"

fontawesome_token="$(fnox get FONTAWESOME_PACKAGE_TOKEN)"
if [ -z "$fontawesome_token" ]; then
	echo "🔴 FONTAWESOME_PACKAGE_TOKEN is not available. Please make sure to configure fnox."
	exit 1
fi

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
		-o "$tarball_path" >/dev/null
fi

echo "🔵 Extracting to $tarball_path..."

mkdir -p "$files_path"
tar -xzf "$tarball_path" -C "$files_path" --strip-components=1

echo "🔵 Copying svgs to $dist_dir_name..."
rm -rf "$dist_dir_path"
mkdir -p "$dist_dir_path"

for style in "${styles[@]}"; do
	cp -r "$files_path/svgs-full/$style/" "$dist_dir_path/$style"
done

echo "🔵 Cleaning up..."
rm -rf "$files_path"

echo -e "\n💚 Font Awesome imported successfully!"
