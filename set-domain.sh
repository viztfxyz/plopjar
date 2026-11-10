#!/usr/bin/env sh
# Fill in the site's address in the SEO tags, robots.txt and sitemap.xml.
# Usage: ./set-domain.sh https://plopjar.example.com   (include any sub-path, e.g. https://you.github.io/plopjar)
set -eu
[ $# -eq 1 ] || { echo "usage: $0 https://your.domain[/path]" >&2; exit 1; }
case "$1" in https://*) ;; *) echo "use a full https:// URL" >&2; exit 1 ;; esac
url=${1%/}; host=${url#https://}
cd "$(dirname "$0")"
grep -q SITE_URL index.html || { echo "SITE_URL placeholder not found (already set?)" >&2; exit 1; }
for f in index.html robots.txt sitemap.xml; do
  sed "s#SITE_URL#$host#g" "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
echo "Site URL set to $url"
