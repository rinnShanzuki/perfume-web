# Third-Party Licenses

This prototype includes the third-party files listed below. Their original license and copyright notices are retained in `dist/client/vendor/`. These notices accompany the files when the static site is copied or deployed.

| Component | Included version / styles | License | Local notice | Official source |
| --- | --- | --- | --- | --- |
| Cormorant Garamond | Google Fonts v21; regular and italic, weights 400, 500, 600 | SIL Open Font License 1.1 | [OFL-Cormorant-Garamond.txt](../dist/client/vendor/OFL-Cormorant-Garamond.txt) | [Google Fonts OFL notice](https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt) |
| DM Sans | Google Fonts v17; regular, weights 400, 500, 600 | SIL Open Font License 1.1 | [OFL-DM-Sans.txt](../dist/client/vendor/OFL-DM-Sans.txt) | [Google Fonts OFL notice](https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt) |
| Decap CMS | 3.15.1 | MIT, with separate bundled dependency notices | [decap-cms-LICENSE.txt](../dist/client/vendor/decap-cms-LICENSE.txt), [decap-cms.js.LICENSE.txt](../dist/client/vendor/decap-cms.js.LICENSE.txt) | [Pinned upstream license](https://raw.githubusercontent.com/decaporg/decap-cms/bc76c05a80ab70d6b5c7cdaafc7d10cf56939c02/LICENSE), [official npm package](https://registry.npmjs.org/decap-cms/3.15.1) |
| React | 18.3.1; retained vendor file | MIT | [React-LICENSE.txt](../dist/client/vendor/React-LICENSE.txt) | [React v18.3.1 license](https://raw.githubusercontent.com/facebook/react/v18.3.1/LICENSE) |

## Self-hosted fonts

The fonts were downloaded on 2026-10-03 through the [official Google Fonts CSS endpoint](https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600&display=swap). Its Unicode subsets and weight/style declarations are preserved in `dist/client/fonts.css`; the font URLs point to local files in `dist/client/assets/fonts/`. `styles.css` and `admin/admin.css` import `/fonts.css`.

There are 36 `@font-face` declarations referencing 12 unique WOFF2 files. Google Fonts provides the same font binary for multiple requested weights. No font binaries were modified or converted.

| Local WOFF2 file | Family / style / subset | Original binary | SHA-256 |
| --- | --- | --- | --- |
| [cormorant-garamond-v21-italic-cyrillic-ext.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-italic-cyrillic-ext.woff2) | Cormorant Garamond / italic / cyrillic-ext | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtFmSq17w.woff2) | `ae25de0507a445fd9e953e90432ae75b1ee2eccb48370a6ced4934551eb56fc3` |
| [cormorant-garamond-v21-italic-cyrillic.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-italic-cyrillic.woff2) | Cormorant Garamond / italic / cyrillic | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtMmSq17w.woff2) | `cb13c04533ee98c94e49a053b9f4d39bf616fd7ba6360d71aead92a78dc571f7` |
| [cormorant-garamond-v21-italic-vietnamese.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-italic-vietnamese.woff2) | Cormorant Garamond / italic / vietnamese | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtHmSq17w.woff2) | `b8ecb4ae898cd9ccae2f2d18fd364f6593bb67776060f9b5d833cec65d34d112` |
| [cormorant-garamond-v21-italic-latin-ext.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-italic-latin-ext.woff2) | Cormorant Garamond / italic / latin-ext | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtGmSq17w.woff2) | `cd5bf126b2c84ab41b254a6a9a1ffb5c326a0f9f82c22fb4704daa31c9aaa415` |
| [cormorant-garamond-v21-italic-latin.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-italic-latin.woff2) | Cormorant Garamond / italic / latin | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2) | `6f2f5c3b1abc3d0bb035a927f66a90ca873f94fc31c4966c8d024142c2036e55` |
| [cormorant-garamond-v21-normal-cyrillic-ext.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-normal-cyrillic-ext.woff2) | Cormorant Garamond / normal / cyrillic-ext | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtKgS4.woff2) | `a4d7cf345b8091e1d2c8c5c8fa3bd0f9bb9d00bc8988185471db398ddb5ae4c4` |
| [cormorant-garamond-v21-normal-cyrillic.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-normal-cyrillic.woff2) | Cormorant Garamond / normal / cyrillic | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrXtKgS4.woff2) | `017fab69b4be8ffc08ca312823327989ade6dc3d948f0afa125e12ec2e5e7ca1` |
| [cormorant-garamond-v21-normal-vietnamese.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-normal-vietnamese.woff2) | Cormorant Garamond / normal / vietnamese | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntKgS4.woff2) | `6252e819a7665ae512c2d046308a9016ada63c06d0d8f96984c4b29f6c9e1bd2` |
| [cormorant-garamond-v21-normal-latin-ext.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-normal-latin-ext.woff2) | Cormorant Garamond / normal / latin-ext | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYp3tKgS4.woff2) | `cfa9a397d86f66c5c51775a2500a712d5f632a04f0c5eca6930dfaf612d4566d` |
| [cormorant-garamond-v21-normal-latin.woff2](../dist/client/assets/fonts/cormorant-garamond-v21-normal-latin.woff2) | Cormorant Garamond / normal / latin | [Google Fonts](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2) | `d80df8ff5aecd299a61549f9e29ab1ed0b9b05f4ea71d50fe978e07d5240b235` |
| [dm-sans-v17-normal-latin-ext.woff2](../dist/client/assets/fonts/dm-sans-v17-normal-latin-ext.woff2) | DM Sans / normal / latin-ext | [Google Fonts](https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6h9Q.woff2) | `a5d38fe99f930275684999b462c7123faa063d9e44e73b4b241723d884aa0f49` |
| [dm-sans-v17-normal-latin.woff2](../dist/client/assets/fonts/dm-sans-v17-normal-latin.woff2) | DM Sans / normal / latin | [Google Fonts](https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2) | `9fea608a947e67020c33cad9a6fe3d60c54119dfb8cff87768a8117a15ed7543` |

## Decap CMS provenance

`dist/client/vendor/decap-cms.js` was verified byte-for-byte against the bundle in [decap-cms@3.15.1 from the official npm registry](https://registry.npmjs.org/decap-cms/-/decap-cms-3.15.1.tgz). The registry metadata identifies upstream commit `bc76c05a80ab70d6b5c7cdaafc7d10cf56939c02`.

The MIT notice at that pinned commit matches the npm package's `LICENSE` file. `decap-cms.js.LICENSE.txt` is copied unchanged from the same package and retains the bundle's original third-party notices. The bundled editor is loaded from the local `/vendor/decap-cms.js` path.

## React vendor file

`dist/client/vendor/react.production.min.js` identifies itself as React 18.3.1. Its official MIT license is included while the vendor file remains in the package.

