#!/usr/bin/env bash

# This script downloads and unpacks suitable icon files archive from the dev bucket.

echo -e "⚡️ Unarchiving icons\n"

source "$(dirname "$0")/_env.sh" --cd-root

if [ -f "$dist_version_path" ] && [ "$(cat "$dist_version_path")" = "$version_hash" ]; then
	echo "🟢 Dist already at version $version_hash, skipping unarchive"
	exit 0
fi

mkdir -p "$(dirname "$dist_archive_path")"

if [ -f "$dist_archive_path" ]; then
	echo "🔵 Found local archive at $dist_archive_path"
else
	if fnox exec -- pnpm wrangler r2 object get "$dev_bucket_dist_version_path" \
		--file "$dist_archive_version_path" \
		--remote >/dev/null 2>&1; then
        echo "🌀 Downloading $dist_archive_name from dev bucket"
        fnox exec -- pnpm wrangler r2 object get "$dev_bucket_dist_path" \
            --file "$dist_archive_path" \
            --remote
	else
		echo "🟠 Archive not found in dev bucket, running build/generate"
		turbo build/generate
		exit $?
	fi
fi

echo "🌀 Unpacking $dist_archive_name to $dist_dir_name"
rm -rf "$dist_dir_name"
tar -C "$root_dir" \
	-I zstd \
	-xf "$dist_archive_path"

echo -e "\n💚 Icons unarchived!"
