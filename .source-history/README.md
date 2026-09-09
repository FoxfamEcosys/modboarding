# Modboarding source provenance

This private repository copies all 63 tracked files from Veri's Modboarding HQ, Sites version 7.

- Original source commit: `6e437b5ba57e3e4a81d3c8bf9756722ccfca41f4`
- Exact source tree: `7fd6d18c6287fed0453fbf85ec1c3efd67266b25`
- GitHub source snapshot commit: `158d9f416a827862cb02fef5671d61dccaa38800`
- Live site: https://veri-modboarding-hq.verithevixen.chatgpt.site/

GitHub's main branch uses new import commits. The original seven commits, their author metadata, and original commit IDs are preserved in `original-history.bundle` beside this document. The bundle was restored into a separate checkout; its HEAD and tree matched the source, and Git's integrity check passed. All imported source blobs and the complete source tree were verified against their original Git hashes. The full original Git history was scanned for known credential patterns before export.

## Restore the original history

From the root of a clone of this GitHub repository:

```sh
git bundle verify .source-history/original-history.bundle
git clone .source-history/original-history.bundle ../modboarding-original-history
git -C ../modboarding-original-history rev-parse HEAD
```

Expected HEAD: `6e437b5ba57e3e4a81d3c8bf9756722ccfca41f4`.

This is a source repository copy. Hosted database contents, runtime secrets, and deployment services are not part of the Git repository. The existing Sites deployment was not changed.
