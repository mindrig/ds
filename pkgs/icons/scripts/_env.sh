#!/usr/bin/env bash

# This script provides package environment variables.
#
# Usage:
#     source "$(dirname "$0")/_env.sh"

set -eo pipefail

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
	echo "🔴 This script is meant to be sourced, not executed!"
	exit 1
fi

# Make sure mise is activated
eval "$(mise activate bash --shims)"
eval "$(mise env -s bash)"

# Base variables
root_dir="$(dirname "$0")/.."
tmp_dir="$root_dir/tmp"

# Version vars
version_hash="$(cat "$root_dir/.fontawesomerc" | sha256sum | cut -c1-8)"
echo "🔵 Version hash: $version_hash"

# Dist vars
dist_dir_name="dist"
dist_dir_path="$root_dir/$dist_dir_name"
dist_version_path="$dist_dir_path/version"
dist_archive_name="$dist_dir_name-$version_hash.tar.zst"
dist_archive_path="$tmp_dir/$dist_archive_name"
dist_archive_version_name="$dist_archive_name.version"
dist_archive_version_path="$tmp_dir/$dist_archive_version_name"

# Dev bucket vars
dev_bucket="$(fnox get CLOUDFLARE_DEV_BUCKET)"
if [ -z "$dev_bucket" ]; then
	echo "🔴 CLOUDFLARE_DEV_BUCKET is not available. Please make sure to configure fnox."
	exit 1
fi
dev_bucket_dist_path="$dev_bucket/icons/$dist_archive_name"
dev_bucket_dist_version_path="$dev_bucket/icons/$dist_archive_version_name"
dev_bucket_token="$(fnox get CLOUDFLARE_DEV_BUCKET_TOKEN)"
export CLOUDFLARE_API_TOKEN="$dev_bucket_token"

# Cd to root if required
for arg in "$@"; do
	case "$arg" in
	--cd-root)
		cd "$root_dir" || {
			echo "🔴 Failed to cd into root dir: $root_dir"
			return 1
		}
		;;
	*) ;;
	esac
done
