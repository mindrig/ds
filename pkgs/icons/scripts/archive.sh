#!/usr/bin/env bash

# This script packs icon files as archive and uploads them to the dev bucket.

echo -e "⚡️ Archiving icons\n"

source "$(dirname "$0")/_env.sh" --cd-root

mkdir -p "$(dirname "$dist_archive_path")"

if fnox exec -- pnpm wrangler r2 object get "$dev_bucket_dist_version_path" \
	--file "$dist_archive_version_path" \
	--remote >/dev/null 2>&1; then
	if [ "$(cat "$dist_archive_version_path")" = "$version_hash" ]; then
		echo "🟢 $dist_archive_name already present on dev bucket, skipping archive"
		exit 0
	fi
fi

if [ -f "$dist_archive_path" ]; then
	echo "🔵 Found existing archive at $dist_archive_path, skipping packing"
else
	echo "🌀 Packing icons to $dist_archive_path"

	tar -C "$root_dir" \
		-I 'zstd -T0 -19' \
		-cf "$dist_archive_path" "$dist_dir_name"
fi

echo "🌀 Uploading $dist_archive_name to dev bucket"
fnox exec -- pnpm wrangler r2 object put "$dev_bucket_dist_path" \
	--file "$dist_archive_path" \
	--remote
fnox exec -- pnpm wrangler r2 object put "$dev_bucket_dist_version_path" \
	--file "$dist_version_path" \
	--remote

echo -e "\n💚 Icons archived!"
