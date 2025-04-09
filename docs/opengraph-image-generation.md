# Generating Beautiful Open Graph images using @vercel/og SDK and its integration with Next.js `next/og`

This is NOT web. This uses @vercel/og internally to generate an image, which uses an image renderer that understands JSX. Most features of web differ. You can load custom OTF and TTF fonts. WOFF fonts are NOT supported and should NEVER be used. Use TailwindCSS for styling. Only standard TailwindCSS colors are supported - custom colors must be used as `text-[#000000]`. ONLY USE the custom colors in the design system theme of the project.

Make good images, and make sure they are good for SEO, following the tips below.

# Generated Open Graph images

The `ImageResponse` constructor allows you to generate dynamic images using JSX and CSS. This is useful for OG images that depend on data.
For example, to generate a unique OG image for each blog post, add a `opengraph-image.tsx` (or `twitter-image.tsx`) file inside the `blog` folder, and import the `ImageResponse` constructor from `next/og`:

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

import { getPost } from '@/app/lib/data';

// Image metadata
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug);

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div tw="text-[128px] bg-white w-full h-full flex items-center justify-center">{post.title}</div>
		)
	);
}
```

`ImageResponse` supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. See the full list of supported CSS properties later in this document.

---

This is an example of a more complex JSX for the image. You can use tailwindcss like this, but you DO NOT USE className, you use tw=""

<div tw="flex flex-col w-full h-full items-center justify-center bg-white">
  <div tw="bg-gray-50 flex w-full">
  <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
	<h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
	  <span>Ready to dive in?</span>
	  <span tw="text-indigo-600">Start your free trial today.</span>
	</h2>
	<div tw="mt-8 flex md:mt-0">
	  <div tw="flex rounded-md shadow">
		<a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">Get started</a>
	  </div>
	  <div tw="ml-3 flex rounded-md shadow">
		<a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">Learn more</a>
	  </div>
	</div>
  </div>
</div>
</div>

---

This is taken from a website. This uses the `edge` runtime, which does the font loading in a different way. It has to use the `fetch` API to load the fonts, as well as the `import.meta.url` to load the fonts from the same directory as the file.
This file is: apps/total-typescript/src/pages/api/og/og-book.tsx
The fonts are in: apps/total-typescript/src/styles/fonts/

```tsx
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

import { getPost } from '@/app/lib/data';

export const config = {
	runtime: 'edge',
};

const magnatHeadFont = fetch(
	new URL('../../../styles/fonts/6fecec1e-f4a1-49a8-8eb2-d3215d7a594e.otf', import.meta.url)
).then((res) => res.arrayBuffer());

const magnatTextFont = fetch(
	new URL('../../../styles/fonts/d5963985-9426-4ddd-9ee9-e0519f89608a.otf', import.meta.url)
).then((res) => res.arrayBuffer());

const larsseitFont = fetch(
	new URL('../../../styles/fonts/de9d52a7-4fdd-4918-a809-30c95835528f.otf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function Image({ params }: { params: { slug: string } }) {
	const magnatHeadFontData = await magnatHeadFont;
	const magnatTextFontData = await magnatTextFont;
	const larsseitFontData = await larsseitFont;

	try {
		const post = await getPost(params.slug);
		// NOTE: Mind the types! You do not always have to check everything, unless it can be undefined in the types.
		const hasTitle = !!post.title;
		const title = hasTitle ? post.title : 'My Default Title';
		const hasBookTitle = !!post.bookTitle;
		const bookTitle = hasBookTitle ? post.bookTitle : 'TotalTypeScript.com';
		const hasImage = !!post.image;
		const image = post.image;

		const defaultBackground =
			'https://res.cloudinary.com/total-typescript/image/upload/v1716212898/book-og-bg_2x_mwyjot.jpg';

		return new ImageResponse(
			(
				<div
					tw="flex w-full relative justify-center text-white items-center h-full justify-between border-b-8 border-cyan-300"
					style={{
						backgroundColor: '#0E1523',
						backgroundImage: `url(${defaultBackground})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div tw="flex-1 flex flex-col justify-between h-full pt-10 pb-40 relative">
						<p tw="flex items-center gap-3 w-full justify-center pr-16 text-white" style={{ fontSize: 48 }}>
							<img
								src="https://res.cloudinary.com/total-typescript/image/upload/v1716213057/book_bzxek7.png"
								width={120}
								height={120}
							/>{' '}
							{bookTitle}
						</p>
						<p
							tw="text-7xl tracking-tight px-10 text-center font-bold leading-tight "
							style={{
								fontFamily: 'Larsseit',
								lineHeight: 1.1,
							}}
						>
							{title}
						</p>
						{/* <div tw="flex items-center absolute right-14 top-12">
              <img
                src="https://www.totaltypescript.com/matt-pocock.jpg"
                tw="h-24 rounded-full"
              />
              <p
                style={{fontSize: 36, fontFamily: 'Larsseit'}}
                tw="text-3xl ml-6 mb-6 text-gray-300"
              >
                Matt Pocock
              </p>
            </div> */}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Magnat Text',
						data: magnatTextFontData,
						style: 'normal',
						weight: 300,
					},
					{
						name: 'Magnat Head',
						data: magnatHeadFontData,
						style: 'normal',
						weight: 600,
					},
					{
						name: 'Larsseit',
						data: larsseitFontData,
						style: 'normal',
						weight: 500,
					},
				],
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
```

---

This is an example from the Next.js docs.
This file is: app/blog/[slug]/opengraph-image.ts

```tsx
import { ImageResponse } from 'next/og';

import { getPost } from '@/app/lib/data';

// Image metadata
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug);

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{post.title}
			</div>
		)
	);
}
```

---

# Supported CSS properties

<table>
<thead>
<tr>
  <th>Property</th>
  <th>Property Expanded</th>
  <th></th>
  <th>Supported Values</th>
</tr>
</thead>
<tbody>

<tr>
<td colspan="2"><code>display</code></td>
<td><code>none</code> and <code>flex</code>, default to <code>flex</code></td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>position</code></td>
<td><code>relative</code> and <code>absolute</code>, default to <code>relative</code></td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>color</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr><td rowspan="5"><code>margin</code></td></tr>
<tr><td><code>marginTop</code></td><td>Supported</td><td></td></tr>
<tr><td><code>marginRight</code></td><td>Supported</td><td></td></tr>
<tr><td><code>marginBottom</code></td><td>Supported</td><td></td></tr>
<tr><td><code>marginLeft</code></td><td>Supported</td><td></td></tr>

<tr><td rowspan="5">Position</td></tr>
<tr><td><code>top</code></td><td>Supported</td><td></td></tr>
<tr><td><code>right</code></td><td>Supported</td><td></td></tr>
<tr><td><code>bottom</code></td><td>Supported</td><td></td></tr>
<tr><td><code>left</code></td><td>Supported</td><td></td></tr>

<tr><td rowspan="3">Size</td></tr>
<tr><td><code>width</code></td><td>Supported</td><td></td></tr>
<tr><td><code>height</code></td><td>Supported</td><td></td></tr>

<tr><td rowspan="5">Min & max size</td></tr>
<tr><td><code>minWidth</code></td><td>Supported except for <code>min-content</code>, <code>max-content</code> and <code>fit-content</code></td><td></td></tr>
<tr><td><code>minHeight</code></td><td>Supported except for <code>min-content</code>, <code>max-content</code> and <code>fit-content</code></td><td></td></tr>
<tr><td><code>maxWidth</code></td><td>Supported except for <code>min-content</code>, <code>max-content</code> and <code>fit-content</code></td><td></td></tr>
<tr><td><code>maxHeight</code></td><td>Supported except for <code>min-content</code>, <code>max-content</code> and <code>fit-content</code></td><td></td></tr>

<tr><td rowspan="5"><code>border</code></td></tr>
<tr><td>Width (<code>borderWidth</code>, <code>borderTopWidth</code>, ...)</td><td>Supported</td><td></td></tr>
<tr><td>Style (<code>borderStyle</code>, <code>borderTopStyle</code>, ...)</td><td><code>solid</code> and <code>dashed</code>, default to <code>solid</code></td><td></td></tr>
<tr><td>Color (<code>borderColor</code>, <code>borderTopColor</code>, ...)</td><td>Supported</td><td></td></tr>
<tr><td>
  Shorthand (<code>border</code>, <code>borderTop</code>, ...)</td><td>Supported, i.e. <code>1px solid gray</code><br/>
</td><td></td></tr>

<tr><td rowspan="6"><code>borderRadius</code></td></tr>
<tr><td><code>borderTopLeftRadius</code></td><td>Supported</td><td></td></tr>
<tr><td><code>borderTopRightRadius</code></td><td>Supported</td><td></td></tr>
<tr><td><code>borderBottomLeftRadius</code></td><td>Supported</td><td></td></tr>
<tr><td><code>borderBottomRightRadius</code></td><td>Supported</td><td></td></tr>
<tr><td>Shorthand</td><td>Supported, i.e. <code>5px</code>, <code>50% / 5px</code></td><td></td></tr>

<tr><td rowspan="11">Flex</td></tr>
<tr><td><code>flexDirection</code></td><td><code>column</code>, <code>row</code>, <code>row-reverse</code>, <code>column-reverse</code>, default to <code>row</code></td><td></td></tr>
<tr><td><code>flexWrap</code></td><td><code>wrap</code>, <code>nowrap</code>, <code>wrap-reverse</code>, default to <code>wrap</code></td><td></td></tr>
<tr><td><code>flexGrow</code></td><td>Supported</td><td></td></tr>
<tr><td><code>flexShrink</code></td><td>Supported</td><td></td></tr>
<tr><td><code>flexBasis</code></td><td>Supported except for <code>auto</code></td><td></td></tr>
<tr><td><code>alignItems</code></td><td><code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code>, <code>baseline</code>, <code>normal</code>, default to <code>stretch</code></td><td></td></tr>
<tr><td><code>alignContent</code></td><td>Supported</td><td></td></tr>
<tr><td><code>alignSelf</code></td><td>Supported</td><td></td></tr>
<tr><td><code>justifyContent</code></td><td>Supported</td><td></td></tr>
<tr><td><code>gap</code></td><td>Supported</td><td></td></tr>

<tr><td rowspan="5">Font</td></tr>
<tr><td><code>fontFamily</code></td><td>Supported</td><td></td></tr>
<tr><td><code>fontSize</code></td><td>Supported</td><td></td></tr>
<tr><td><code>fontWeight</code></td><td>Supported</td><td></td></tr>
<tr><td><code>fontStyle</code></td><td>Supported</td><td></td></tr>

<tr><td rowspan="12">Text</td></tr>
<tr><td><code>tabSize</code></td><td>Supported</td><td></td></tr>
<tr><td><code>textAlign</code></td><td><code>start</code>, <code>end</code>, <code>left</code>, <code>right</code>, <code>center</code>, <code>justify</code>, default to <code>start</code></td><td></td></tr>
<tr><td><code>textTransform</code></td><td><code>none</code>, <code>lowercase</code>, <code>uppercase</code>, <code>capitalize</code>, defaults to <code>none</code></td><td></td></tr>
<tr><td><code>textOverflow</code></td><td><code>clip</code>, <code>ellipsis</code>, defaults to <code>clip</code></td><td></td></tr>
<tr><td><code>textDecoration</code></td><td>Support line types <code>underline</code> and <code>line-through</code>, and styles <code>dotted</code>, <code>dashed</code>, <code>solid</code></td><td></td></tr>
<tr><td><code>textShadow</code></td><td>Supported</td><td></td></tr>
<tr><td><code>lineHeight</code></td><td>Supported</td><td></td></tr>
<tr><td><code>letterSpacing</code></td><td>Supported</td><td></td></tr>
<tr><td><code>whiteSpace</code></td><td><code>normal</code>, <code>pre</code>, <code>pre-wrap</code>, <code>pre-line</code>, <code>nowrap</code>, defaults to <code>normal</code></td><td></td></tr>
<tr><td><code>wordBreak</code></td><td><code>normal</code>, <code>break-all</code>, <code>break-word</code>, <code>keep-all</code>, defaults to <code>normal</code></td><td></td></tr>
<tr><td><code>textWrap</code></td><td><code>wrap</code>, <code>balance</code>, defaults to <code>wrap</code></td><td></td></tr>

<tr><td rowspan="7">Background</td></tr>
<tr><td><code>backgroundColor</code></td><td>Supported, single value</td><td></td></tr>
<tr><td><code>backgroundImage</code></td><td><code>linear-gradient</code>, <code>radial-gradient</code>, <code>url</code>, single value</td><td></td></tr>
<tr><td><code>backgroundPosition</code></td><td>Support single value</td><td></td></tr>
<tr><td><code>backgroundSize</code></td><td>Support two-value size i.e. <code>10px 20%</code></td><td></td></tr>
<tr><td><code>backgroundClip</code></td><td><code>border-box</code>, <code>text</code></td><td></td></tr>
<tr><td><code>backgroundRepeat</code></td><td><code>repeat</code>, <code>repeat-x</code>, <code>repeat-y</code>, <code>no-repeat</code>, defaults to <code>repeat</code></td><td></td></tr>

<tr><td rowspan="5"><code>transform</code></td></tr>
<tr><td>Translate (<code>translate</code>, <code>translateX</code>, <code>translateY</code>)</td><td>Supported</td><td></td></tr>
<tr><td>Rotate</td><td>Supported</td><td></td></tr>
<tr><td>Scale (<code>scale</code>, <code>scaleX</code>, <code>scaleY</code>)</td><td>Supported</td><td></td></tr>
<tr><td>Skew (<code>skew</code>, <code>skewX</code>, <code>skewY</code>)</td><td>Supported</td><td></td></tr>

<tr>
<td colspan="2"><code>transformOrigin</code></td>
<td>Support one-value and two-value syntax (both relative and absolute values)</td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>objectFit</code></td>
<td><code>contain</code>, <code>cover</code>, <code>none</code>, default to <code>none</code></td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>opacity</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>boxShadow</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>overflow</code></td>
<td><code>visible</code> and <code>hidden</code>, default to <code>visible</code></td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>filter</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>clipPath</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr>
<td colspan="2"><code>lineClamp</code></td>
<td>Supported</td>
<td></td>
</tr>

<tr><td rowspan="5">Mask</td></tr>
<tr><td><code>maskImage</code></td><td><code>linear-gradient(...)</code>, <code>radial-gradient(...)</code>, <code>url(...)</code></td><td></td></tr>
<tr><td><code>maskPosition</code></td><td>Supported</td><td></td></tr>
<tr><td><code>maskSize</code></td><td>Support two-value size i.e. <code>10px 20%</code></td><td></td></tr>
<tr><td><code>maskRepeat</code></td><td><code>repeat</code>, <code>repeat-x</code>, <code>repeat-y</code>, <code>no-repeat</code>, defaults to <code>repeat</code></td><td></td></tr>

<tr>
<td rowspan="2"><code>WebkitTextStroke</code>
<td><code>WebkitTextStrokeWidth</code></td>
<td>Supported</td>
<td></td>
</tr>
<tr>
<td><code>WebkitTextStrokeColor</code></td>
<td>Supported</td>
<td></td>
</tr>

</tbody>
</table>

---

# Available fonts for this project

The fonts used in the examples are NOT available in the project. DO NOT use them! Use only the fonts available in the project, which are part of the style guide design system typography.

Fonts are in the `src/assets/fonts` folder.

**WOFF2 FONTS ARE NOT SUPPORTED! ONLY USE OTF OR TTF WOFF FONTS.** WOFF fonts without the 2 in the name are supported because they are older.

- glitch.otf - part of the design system, only for the "TUES Fest 2025" logo (TF_TITLE constant)
- glitch.woff2 (not supported, DO NOT USE)
- origintech.otf (not part of the design system)
- origintech.ttf (not part of the design system)
- origintech.woff (not part of the design system, but is supported because there is no 2 in the name)
- RubikMonoOne-Regular.ttf - part of the design system, used for headings. Very heavy font.
- warzone97.ttf (not part of the design system)
- Geist-ExtraBold.otf - rest of the text
- Geist-Thin.otf - rest of the text
- Geist-Bold.otf - rest of the text
- Geist-ExtraLight.otf - rest of the text
- Geist-Black.otf - rest of the text
- Geist-Regular.otf - rest of the text
- Geist-Light.otf - rest of the text
- Geist-SemiBold.otf - rest of the text
- Geist-Medium.otf - rest of the text

# Style guide for this project

- Background is a wave image (see available wave images)
- The logo is its own thing, NOT a large heading
- Large headings use the "RubikMonoOne-Regular.ttf" font
- Large headings have the style: `tw="bg-clip-text font-black text-transparent from-primary via-primary bg-gradient-to-r via-10% to-indigo-500 transition-transform duration-500 ease-out group-hover:scale-[1.01] [text-shadow:0_0_25px_rgba(245,66,109,0.15),0_0_20px_rgba(99,102,241,0.15)] text-3xl md:text-5xl mb-5"` (sizes may vary)
- The logo uses the "Glitch" font. "TUES Fest" is #e11d48, and the year is #6366f1.
- Rest of the text is the "Geist" font family, white
- ShadCN styles are used:

ShadCN color theme:

```css
:root {
	--radius: 0.625rem;
	--background: #020817;
	--foreground: #f8fafc;
	--card: #020817;
	--card-foreground: #f8fafc;
	--popover: #020817;
	--popover-foreground: #f8fafc;
	--primary: #e11d48;
	--primary-foreground: #fff1f2;
	--secondary: #1e293b;
	--secondary-foreground: #f8fafc;
	--muted: #1e293b;
	--muted-foreground: #94a3b8;
	--accent: #1e293b;
	--accent-foreground: #f8fafc;
	--destructive: #7f1d1d;
	--destructive-foreground: #f8fafc;
	--border: #ffffff;
	--input: #ffffff;
	--ring: #1d4ed8;
	--chart-1: #2662d9;
	--chart-2: #2eb88a;
	--chart-3: #e88c30;
	--chart-4: #af57db;
	--chart-5: #e23670;
	--sidebar: #020817;
	--sidebar-foreground: #f8fafc;
	--sidebar-primary: #2662d9;
	--sidebar-primary-foreground: #f8fafc;
	--sidebar-accent: #1e293b;
	--sidebar-accent-foreground: #f8fafc;
	--sidebar-border: #ffffff;
	--sidebar-ring: #1d4ed8;
}
```

# Sample markup

Logo (in 2 lines wrapped, can also go on 1 line):

```tsx
<h1>
	<span style={{ fontFamily: 'Glitch' }} tw="text-[#e11d48] block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
		TUES FEST
	</span>
	<span style={{ fontFamily: 'Glitch' }} tw="text-3xl text-[#6366f1] sm:text-4xl md:text-5xl lg:text-6xl">
		{TF_YEAR}
	</span>
</h1>
```

Motto:

```tsx
<p
	style={{ fontFamily: 'RubikMonoOne-Regular' }}
	tw="text-[#f8fafc]/90 mt-8 text-xl tracking-widest sm:text-2xl md:text-3xl"
>
	IT ALL STARTS HERE
</p>
```

Main heading/title (NOT the logo or motto):

```tsx
<h1
	style={{ fontFamily: 'RubikMonoOne-Regular' }}
	tw="bg-clip-text font-black text-transparent from-[#e11d48] via-[#e11d48] bg-gradient-to-r via-10% to-[#6366f1] [text-shadow:0_0_25px_rgba(245,66,109,0.15),0_0_20px_rgba(99,102,241,0.15)]"
>
	За ТУЕС
</h1>
```

> NOTE: the size can be changed, so it fits the image.

For regular text, use the `muted-foreground` color and the `Geist` font family.
If you think it would need to be more visible, use the `foreground` color.
DO NOT use color names, use hex codes

# Available wave images

NOTE: Mind import paths. OG images are inside app/page/...

## 'src/assets/wave-32.jpg'

wave-32.jpg (2000x1333px) - Strategic wave blob positioning:

- Top-left: Large red (#e11d48) blob dominates ~40% of the upper-left quadrant
- Top-right: Electric blue (#6366f1) accent creates a balanced counterweight
- Center: Diagonal intersection of red and blue creates a natural focal point
- Bottom-right: Subtle blue gradient fades into the navy background
- Bottom-left: Darker area provides natural space for content
- Negative space: Deep navy (#020817) background creates ~30% clear areas between waves
- Layout zones:
    - Header zone (top 1/3): High contrast, ideal for titles/logos
    - Content zone (middle 1/3): Balanced color intensity, good for main content
    - Footer zone (bottom 1/3): Subtle gradients, perfect for secondary information
- Safe zones: Corners (except top-left) remain relatively clear for overlaid content

## 'src/assets/wave-36.jpg' - (2000x1333px)

wave-36.jpg (2000x1333px) - Strategic wave blob positioning:

- Top edge: Continuous wave pattern with blue (#6366f1) dominant curve spanning full width
- Top-left: Red (#e11d48) accent merges with blue creating purple transition
- Center: Large clear navy (#020817) space, minimal wave interference
- Bottom-left: Prominent blue wave formation curves upward
- Bottom-center: Horizontal red streak creates dynamic tension
- Bottom-right: Multiple overlapping blue waves create layered effect
- Negative space: Deep navy (#020817) background occupies ~50% of central area
- Layout zones:
    - Header zone (top 1/3): Single dominant wave, good for wide logos/headers
    - Content zone (middle 1/3): Clean, dark space ideal for text content
    - Footer zone (bottom 1/3): Complex wave interactions, best for decorative elements
- Safe zones: Center area provides maximum contrast for content placement

Key differences from wave-32:

- More horizontal wave patterns (vs. diagonal in wave-32)
- Larger clear central area (vs. intersecting waves in wave-32)
- Bottom-heavy complexity (vs. top-heavy in wave-32)
- More separated color regions (vs. blended transitions in wave-32)

## 'src/assets/wave-37.jpg' - (2000x1333px)

wave-37.jpg (2000x1333px) - Strategic wave blob positioning:

- Top edge: Rhythmic wave pattern with alternating red (#e11d48) and blue (#6366f1) peaks
- Top-right: Strong red accent creates visual anchor
- Center: Exceptionally clean navy (#020817) space, largest of all variants
- Bottom-right: Prominent blue wave rises from corner
- Bottom-left: Bold red accent creates balanced corner weight
- Bottom-center: Subtle blue undulation connects the corners
- Negative space: Deep navy (#020817) background dominates ~60% of total area
- Layout zones:
    - Header zone (top 1/3): Rhythmic multi-peak pattern, perfect for wide content or multiple elements
    - Content zone (middle 1/3): Pristine dark space, maximum readability for primary content
    - Footer zone (bottom 1/3): Balanced corner accents frame bottom content
- Safe zones: Extensive central clear area with structured corners

Key differences from wave-32/36:

- Most minimal wave pattern of all variants
- Symmetrical top wave pattern (vs. asymmetric in 32/36)
- Largest clear central space of all variants
- Corner-anchored design (vs. edge-flowing in 36 or diagonal in 32)

Ideal use cases:

- Content-heavy layouts requiring maximum legibility
- Designs with multiple header elements needing equal emphasis
- Layouts requiring strong corner anchoring
- Minimal designs where text clarity is paramount

## 'src/assets/wave-39.jpg' - (2000x1333px)

# WARNING!!!!

You CANNOT use existing components from the project to generate the image. You MUST use the `ImageResponse` constructor from the `next/og` package. Components in project use `className`, so they will appear unstyled in the image.

You CAN put reusable components in the `src/partials/opengraph` folder. That folder is special - ONLY for components used in opengraph images. They CANNOT be used outside of the opengraph image generation.

You CANNOT use components from ANY OTHER FOLDER in the project inside the opengraph image generation.

Note:

1. Three-dimensional transforms are not supported.
2. There is no `z-index` support in SVG. Elements that come later in the document will be painted on top.
3. `box-sizing` is set to `border-box` for all elements.
4. `calc` isn't supported.
5. `currentcolor` support is only available for the `color` property.

### Language and Typography

Advanced typography features such as kerning, ligatures and other OpenType features are not currently supported.

RTL languages are not supported either.

### Creating excellent Open Graph and Twitter images

**For Crafting Awesome `og:image` and `twitter:image` pairs:**

- **Clarity is King:** Make sure your title or key message is super clear and easy to read at a glance. Think big, bold fonts!
- **Brand It:** Use your brand colors, logo (if appropriate), and consistent visual style.
- **Relevant Visuals:** Pick images or graphics that _directly_ relate to the content of the page. No random stock photos!
- **Consider Cropping:** Twitter crops images differently than other platforms. Design with this in mind, or create separate `twitter:image` to avoid important parts being cut off.
- **Action-Oriented (Twitter):** For Twitter, consider adding a call to action to the image like "Read More" or "Learn More" to encourage clicks.
- **Mobile-First:** Remember that many users will see your image on their phones, so keep it clean and uncluttered.
- **Test, Test, Test:** Use social media sharing debuggers (like Facebook's Sharing Debugger or Twitter's Card Validator) to see how your images look before you publish.

**General Tips for a Great `og:image`:**

- **Focus on the Core Message:** What's the one thing you want people to understand about your page when they see the image?
- **Professional Look:** Invest in good design. A well-designed image conveys professionalism and trustworthiness.
- **High Resolution:** Use a high-resolution image that looks crisp and clear on all devices.
- **Appropriate Size:** Adhere to the recommended image sizes for each platform to avoid distortion or cropping issues.
- **Consistency:** Maintain a consistent visual style across all your `og:image` and `twitter:image` to build brand recognition.
