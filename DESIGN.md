# DESIGN.md — Swiftradish UI/UX contract

This document records design principles and the criteria used to judge later screens. It is not a set of finished screens, and it does not authorize drawing the mascot library or building the interface during foundation work.

Evidence labels: **Owner decision**, **Verified**, **Research finding**, **Recommendation**, **Calculated**, **Unverified**.

External references below were checked on 14 Oct 2026 and extended on 15 Oct 2026.

## 1. What this contract decides

**Owner decision.** Swiftradish is a general-purpose social product: feeds, posts, carousels, later reels, profiles, follows, communities, discussions, search, notifications, settings, and an installable responsive PWA. The mascot is a cute-but-mighty character with a system that can produce 100 or more consistent poses. It is not a badge, streak, or engagement mechanic.

**Rejected, and absent from this contract.** Co-Plots, Radish Patches as a community brand, a dual feed, Fresh Harvest ranking, mandatory community joins, and dark-first "Nocturnal Botanical Studio" as a required theme. Those belong to the historical blueprint, page 1.

**Recommendation, until an explicit visual approval.** The palette, the typeface, Lucide, the component kit, and the exact motion timings. The token *structure* is part of the contract. The hex values are one proposed starting point, not an approved brand.

This file does not substitute for designing the screens. Before substantial frontend implementation, the owner reviews the selected visual direction, the tokens, the component rules, the mascot direction, and representative desktop and mobile screens. Stitch may be used for that exploration. Phase A does not run it and does not generate production assets.

### Where each topic is decided

| Topic | Status |
|---|---|
| Visual direction | Recommendation. Three directions are compared below. None is approved. |
| Layout and responsive behavior | Recommendation. Familiar destinations are an owner decision. Breakpoints are not. |
| Typography | Recommendation. Source Sans 3 is a candidate. |
| Color | Recommendation. Contrast ratios below are calculated, not screenshot-tested. |
| Component patterns and interaction states | The required states are part of the contract. The component library is a recommendation. |
| Iconography | Recommendation. One set, currently Lucide. |
| Motion and transitions | Recommendation. Ceilings only, until measured with reduced motion on. |
| Loading experiences | Recommendation, gathered from the component and performance rules. |
| Accessibility | Verified criteria from WCAG 2.2. Applying them to a screen is still future work. |
| Perceived performance | External targets to measure. This app has no measurement yet. |
| Visual QA | The review process below is the contract. No screen has been reviewed. |
| Brand mascot | Owner decision for the character system. Artwork is not part of Phase A. |

## 2. Principles

1. The feed, composer, and discussions stay quiet enough to read. Personality lives in the wordmark, the accent color, and the mascot at a few specified moments.
2. Navigation is familiar: home, search, create, communities, activity, profile. No control is shown unless it does something.
3. One icon set. Emoji are not controls. A second icon family is not mixed into the product UI.
4. Interface copy is sentence case, active, and specific. The control and the result share a verb: "Publish" leads to "Published."
5. Motion explains a change the person caused. It does not decorate the feed.
6. Every primary journey has loading, empty, success, error, and disabled states. An empty screen says what to do next. An error names the failure and the retry.
7. Light and dark themes consume the same semantic tokens. Contrast meets WCAG 2.2 AA in both.
8. The page is content-first. Chrome, cards, and empty space earn their place by making the post, discussion, or action easier to scan. A sparse marketing layout is not the feed.

## 2.1 Visual directions

**Recommendation.** None of these directions is approved. They are compared so the first shell is a choice, not a default template. The existing hex values belong to direction A only.

The comparison uses three constraints that are already verified, not a trend list:

- WCAG 2.2 AA contrast and a 24 CSS pixel minimum target, with a stricter 44 CSS pixel target for primary navigation and composer actions. [1.4.3](https://www.w3.org/TR/WCAG22/), [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).
- Body text stays near 50–75 characters, and does not rely on a line longer than WCAG 1.4.8's 80 characters. 1.4.8 is AAA, so the 80-character cap is a recommendation, not an AA gate. [Baymard on line length](https://baymard.com/research-articles/line-length-readability).
- A home feed of mixed posts can use a vertical list of cards. A card grid is a poor way to scan many similar items, and cards already consume more vertical space than a list. [NN/g on cards](https://www.nngroup.com/articles/cards-component/). Infinite append suits a homogeneous social stream, and it still needs a way to move focus past the stream. [NN/g on infinite scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/).

**A. Quiet column.** One reading column, paper cards, one accent, and the mascot only at the four allowed moments. This matches the first release, which is text posts in a chronological feed. It is the easiest of the three to keep at AA, and it keeps implementation to tokens, one font, and CSS. Its risk is looking like a generic card list if the wordmark, accent, and mascot are the only signs of Swiftradish. Media will feel secondary until a viewer exists.

**B. Dense discussion.** Smaller type, a vote rail, and more rows per screen, closer to a community thread than to a magazine. This suits later discussions, where people compare many short comments. It puts pressure on the 24 pixel target and on contrast, and it fights carousels and reels. It is not the right first shell.

**C. Media stage.** Large images, thin chrome, and a full-bleed viewer. This suits carousels and reels after those lifecycles exist. It makes text discussions and communities secondary, and it raises layout-shift and loading cost because every row is a large reserved box. NN/g's scrolling research also warns that very sparse pages push the next post farther down the page. [Scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/).

**Recommendation for the first shell.** Start from A. Borrow B's predictable row alignment for discussion threads, without shrinking the targets. Reserve C for the carousel and reel viewers. Reject glass, large decorative gradients, and a second accent used as decoration. A direction becomes the contract only after the approval gate in section 15.

## 3. Evidence used

- WCAG 2.2 success criterion 2.3.3, Animation from Interactions, and technique C39: non-essential motion started by interaction can be turned off. [Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). [C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39). [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility).
- WCAG 2.2.2 Pause, Stop, Hide still applies to motion the page starts by itself. Feed video does not autoplay with sound. Decorative loops do not run.
- WCAG 2.2 AA contrast, focus visibility, target size (24 CSS pixels minimum), and name/role/value for controls. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- Core Web Vitals are external targets to measure, not a claim that this app meets them: LCP 2.5 s, INP 200 ms, CLS 0.1. [Web Vitals](https://web.dev/articles/vitals).
- Material 3's older duration scale is a ceiling reference. Material now prefers springs, and the duration tokens are no longer the maintained system. Short 50–200 ms, medium 250–400 ms. [Duration tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs). Exact milliseconds are chosen during implementation and checked with reduced motion on. They are not acceptance gates until measured.
- A JavaScript size budget is a **recommendation** to set after the first shell exists. This contract does not invent one.
- WCAG 2.2 success criterion 1.4.11, Non-text Contrast: identifying parts of a control, including the focus indicator, need 3:1 against the adjacent color. [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast).
- WCAG 2.2 success criterion 2.5.8, Target Size (Minimum), is 24 by 24 CSS pixels, with the exceptions in the criterion. The understanding document recommends the stricter 44 pixel enhanced target for important controls. [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).
- Baymard, checked 15 Oct 2026: body text of about 50–75 characters, with WCAG 1.4.8 (AAA) cited there as 80 characters or fewer. [Line length](https://baymard.com/research-articles/line-length-readability).
- Nielsen Norman Group on cards, infinite scrolling, and scrolling attention, as cited in section 2.1.
- Source Sans 3 is an Adobe UI sans released under the SIL Open Font License 1.1. [Adobe's license file](https://github.com/adobe-fonts/source-sans/blob/main/LICENSE.md). That license makes it a lawful candidate. It does not make it the chosen face.
- Lucide's current license is ISC, and a listed subset of icons derived from Feather remains MIT. [Lucide license](https://lucide.dev/license). The earlier "MIT only" description in this file was incomplete.

## 4. Design tokens

Three layers. Components may use semantic tokens only. They do not read primitive hex values.

### Primitive (recommendation)

| Token | Light value | Role |
|---|---|---|
| `--ink-900` | `#1C2430` | Primary text and icons |
| `--mist-100` | `#EEF3F1` | App background |
| `--paper-0` | `#FFFFFF` | Cards and sheets |
| `--radish-600` | `#D4324A` | Brand accent |
| `--leaf-700` | `#2F6B4F` | Positive and community accent |
| `--spark-500` | `#E6A817` | Small highlight only |
| `--danger-600` | `#B42318` | Destructive and error |
| `--space-1` | `4px` | Base step |

Dark primitives invert the surfaces, not the accent. `--ink-900` becomes the light text color. `--mist-100` becomes a dark cool surface near `#121816`. `--paper-0` becomes a raised surface near `#1C2622`. Radish, leaf, and spark stay recognizable and must still pass AA against the dark surface. If a pair fails contrast, darken or lighten that pair. Do not lower the AA bar.

### Calculated contrast (15 Oct 2026)

**Calculated.** These ratios use the WCAG relative-luminance formula on the hex values above. They are not a screenshot review, and they do not approve the palette. No replacement hex is proposed here.

| Pair | Ratio | Normal text AA (4.5:1) | Large text or 3:1 UI |
|---|---|---|---|
| `#1C2430` on `#FFFFFF` | 15.62:1 | Pass | Pass |
| `#1C2430` on `#EEF3F1` | 13.93:1 | Pass | Pass |
| `#FFFFFF` on `#D4324A` | 4.82:1 | Pass | Pass |
| `#D4324A` on `#121816` | 3.73:1 | Fail | Large text only |
| `#D4324A` on `#1C2622` | 3.23:1 | Fail | Large text only |
| `#2F6B4F` on `#121816` | 2.86:1 | Fail | Fail |
| `#B42318` on `#121816` | 2.73:1 | Fail | Fail |
| `#E6A817` on `#FFFFFF` | 2.10:1 | Fail | Fail |
| `#E6A817` on `#121816` | 8.54:1 | Pass | Pass |

White on radish can be button text. Radish on the proposed dark surfaces fails normal-text AA and passes the 3:1 threshold, so it can be large text or a UI mark there, not body text. Leaf and danger on `#121816` fail both normal text and 3:1. Spark on white fails 1.4.11 as a focus ring on paper. Spark on the dark surface passes. The first shell review adjusts the failing pairs. Until that review, these hex values stay a recommendation.

### Semantic

`--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--color-positive`, `--color-danger`, `--color-focus`.

Focus uses a 2 px outline in `--color-focus` with a 2 px offset. It stays visible on both themes. Spark was the candidate for that outline and for tiny status marks. The calculation above shows spark on white fails 3:1, so it cannot be the focus ring on paper until the pair is adjusted. It is not a fill for large buttons.

### Component

Examples: `--button-bg`, `--button-text`, `--card-bg`, `--card-radius`, `--field-border`, `--nav-height`.

Buttons that commit an action use the accent fill and a text color that passes AA on radish. Secondary actions use a surface fill and a border. Destructive actions use danger. A busy button keeps its label and shows progress without shifting layout.

### Spacing, type, and shape

Spacing is multiples of 4 px so type, controls, and media share one grid.

**Type recommendation.** One variable sans for the product UI, loaded with `next/font` so it does not shift layout. Source Sans 3 is the candidate because Adobe designed it for UI and released it under OFL 1.1. A display face is limited to the signed-out introduction. Feed line length stays inside a column of about 40 rem, then checked against the chosen font: the evidence target is about 50–75 characters, not the rem value itself. Do not set body text below 16 px.

Radius is small on inputs and cards (8 px) and full on icon buttons. One radius scale. Do not round every region the same amount regardless of hierarchy.

## 5. Iconography

**Recommendation.** `lucide-react` is the only product icon set. It is tree-shakeable and drawn on one grid. The license, checked 15 Oct 2026, is ISC, with the Feather-derived icons listed by Lucide remaining MIT. Keep the upstream license file with the dependency if it is added later. A custom icon is allowed only for the wordmark and the mascot, and it does not join the product icon set.

Rules:

- Import the icons the screen uses. Do not add a second set such as Heroicons or Phosphor beside it.
- Do not use emoji as buttons, navigation, or status icons.
- An icon-only control has an accessible name. The visible tooltip does not replace that name.
- Icon size is 20 px in compact controls and 24 px in the navigation. Stroke width stays at the library default.

## 6. Navigation and layout

- Below 768 px: bottom navigation with home, search, create, communities, and activity. Profile is reached from the account control. The bar is at least 24 px in target height per item, and primary items are larger.
- From 768 px to 1279 px: the same destinations. Use the bottom bar until a left rail fits without crushing the feed.
- At 1280 px and above: a left rail with the same destinations, in the same order, with the same names.
- The create action opens the composer. It does not navigate to a dead page.
- One feed column. Media keeps its aspect ratio reserved before the file arrives, so the page does not jump.

Screens this contract covers: signed-out home, register, login, expired session, feed, composer, post, carousel viewer, profile, follow lists, communities index, community detail, discussion thread, search, notifications, settings, block, report, full-page loading, empty, offline, and unrecoverable error.

Direct messages are optional and have no screen in this contract until that product decision is made. If that decision is made later, messages use the same column, the same states, and no extra chrome.

### Content composition

**Recommendation.** These are density rules for later screen design, not layouts to build now. NN/g's scrolling research is the reason to avoid oversized cards and large empty regions: attention stays near the top, and sparse pages push the next post down. [Scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/).

- Feed: one vertical list. Each card is one post. Author, time, and body come before actions. Media, when present, uses the post's aspect ratio and does not become a full-viewport tile in the list.
- Discovery and search: results are rows with a name and one line of context. A masonry grid is not the default.
- Profile and follow lists: identity at the top, then the same post list. Counts are text, not a trophy row.
- Communities: a row is name, one-line description, and membership. The detail page leads with the conversation, not a banner.
- Discussions and comments: a predictable row, indented only for replies, with a depth cap. Voting sits on the row and keeps a 24 pixel target.
- Notifications: one event per row, newest first, with the object named in the sentence.
- Composer: the field is the page. Media is added into that field. Publishing stays visible.
- Carousel and reel viewers are the exception that may go full-bleed, and only after those lifecycles exist.
- Settings, block, and report are short forms. They do not introduce a second visual system.

## 7. Components and states

Every interactive component documents default, hover, focus-visible, pressed, selected, disabled, busy, success, error, and retry. Undo, where it exists, is the same control used again: like, bookmark, follow, and vote toggle back. Leave and delete ask for confirmation. A timed undo toast is not part of this contract.

Selected means the current navigation item, the current vote, or the current carousel position, and it is indicated by more than color. Success is the announced result of the verb, usually inline or in a toast. Retry stays on the failed control or the failed media frame. No control is shown for an action the product cannot perform.

| Component | Required behavior |
|---|---|
| Button | Visible focus. Disabled does not submit. Busy keeps width stable. |
| Icon button | Accessible name. Hit area at least 24 px, 44 px for primary nav and composer actions. |
| Text field | Label is visible. Error text is tied to the field. The field does not rely on color alone. |
| Composer | Text can be published without media. Submitting twice does not create two posts. |
| Post card | Author, time, body, and actions. Actions announce the new state after a like, bookmark, or vote. |
| Carousel | Scroll-snap, previous, next, and position text such as "2 of 5". Swipe and buttons both work. |
| Video frame | Reserved box. No autoplay with sound. A control pauses playback. |
| Comment | Reply is indented within a depth cap. Deleted comments leave a tombstone, not a hole. |
| Vote | One vote per person. The control shows the current choice and the count. |
| Community row | Name, membership state, and join or leave. Leave asks for confirmation. |
| Nav item | Current location is indicated by more than color. |
| Dialog and menu | Focus moves inside, stays trapped, and returns to the opener. Escape closes. |
| Toast | Confirms the verb that just happened. It is not a place for the mascot. It does not steal focus from typing. |
| Skeleton | Matches the loaded layout, including media boxes. |
| Empty state | Says what is missing and the next action. The mascot is allowed only on the first empty home. |
| Error state | Names the failure and offers retry. A rare full-page failure may use the mascot. |

Optimistic likes, follows, votes, and bookmarks update immediately and roll back in place if the request fails. The failure stays next to the control.

## 8. Motion

External rule: if the operating system asks for reduced motion, non-essential movement stops. Opacity or an instant state change may remain. Completion logic still runs, so a dialog that listens for the end of a transition does not get stuck. [C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39).

Ceiling, not a measured budget:

- Controls stay in Material's short band, at or under 200 ms.
- Overlays stay in the medium band, at or under 400 ms.
- Nothing in the feed loops.

Rules:

- Page changes use a short opacity or a small slide. Shared-element transitions wait until a media viewer exists and a prototype shows they help.
- Carousels use CSS scroll-snap plus buttons, not a slider package.
- A sheet or dialog may use one spring if CSS cannot express it. The rest of the product stays in CSS.
- No scroll-jacking, no parallax, and no perpetual mascot animation in the feed.
- Pull-to-refresh, if added later, must have a reduced-motion equivalent that still refreshes.

### Loading experiences

**Recommendation.** Loading is a state of the layout the person is waiting for, not a separate illustrated scene.

- A route or feed uses a skeleton that matches the loaded column, including media boxes.
- A button stays the same width, keeps its label, and shows progress.
- Appending older posts adds rows below. It does not move the posts already on screen.
- A failed image or video retries on that frame and does not collapse the card.
- Offline keeps the last loaded page, marks it stale, and disables publishing.
- The mascot may appear on a full-page load. It does not appear on a skeleton, a button, or a toast.
- Reduced motion keeps the skeleton and the state change, and drops travel.

## 9. Perceived performance and failure

- Reserve width and aspect ratio for every image and video before decode.
- Skeletons match the final layout.
- A failed media load shows a retry on that frame. It does not collapse the card.
- Offline shows the last loaded page as stale and disables publishing.
- An expired session sends the person to sign in and preserves the return path.
- The first interactive route will be measured for the Web Vitals targets above. A bundle budget is chosen after that measurement, not before.

## 10. Mascot

The long-term library is 100 or more poses from one character system. Phase A does not generate artwork.

The character is called "the radish" until a name is chosen. "Pip" is a research finding, not a decision.

### Character bible

- Silhouette: a compact radish body, a leafy crown, short limbs, a large head, and a stable stance. The same outer silhouette reads at 32 px and at 256 px.
- Proportions: head and body stay on one grid in every pose. Emotions do not invent a new body.
- Face: two eyes and a small mouth. Expressions come from the eyes, brows, mouth, leaf angle, and arms.
- Materials: flat vector color from the palette, plus one soft contact shadow. No gradients that break the silhouette, no texture that disappears at small size.
- Colors: radish body, leaf crown, ink for line and features, paper for the eye highlight. No extra colors.

### How 100 or more poses stay consistent

Poses are combinations of a fixed part set, not new characters:

- View: front, three-quarter, profile.
- Arms: down, wave, hold, point, shrug, cheer.
- Face: neutral, smile, focus, worry, surprise, sorry, sleep, cheer.
- Leaves: calm, alert, droop, burst.

**Calculated, not a visual proof.** Three views, six arm poses, and eight faces are 144 combinations before the four leaf variants. That arithmetic is why a part grid can reach more than 100 poses. It does not prove those drawings will look like one character. A new pose must reuse this grid. If it needs a new body shape, it is rejected or the bible is revised first. The long-term library remains 100 or more poses from this one system. Phase A still produces no artwork.

Naming: `mascot/{pose}/{variant}.svg`. Example: `mascot/wave/front.svg`. SVG is the source. Reduced motion uses a still frame of the same pose. Do not ship a raster as the only source.

### Validation sheet

Before any batch beyond these seven, draw and compare:

1. Front idle.
2. Three-quarter idle.
3. The same idle reduced to 32 px.
4. Success.
5. Error.
6. Empty.
7. Loading.

If those seven cannot share one silhouette, stop and fix the bible. The seven are a test of the system. They are not the finished library.

### Where the character may appear

Allowed: onboarding, the first empty home, a full-page load, and a rare unrecoverable error.

Not allowed: post cards, every empty list, navigation, buttons, or toasts.

## 11. Themes

Both themes are specified now. Phase B implements and screenshots both, after the visual approval gate. Components do not branch on theme by hand. They use the semantic tokens, and the theme switches the primitive values under those names.

### Accessibility

**Verified criteria, applied later.** A screen is not accessible because this section exists. The checks in section 12 are how a built screen is judged.

- 1.4.3 Contrast (Minimum): text meets AA in both themes. The calculated table shows which proposed pairs already fail.
- 1.4.11 Non-text Contrast: a control's identifying parts, including focus, meet 3:1 against the adjacent color. Spark on white does not.
- 1.4.1 Use of Color: selection, errors, and votes have a second cue.
- 2.4.7 Focus Visible, and 2.4.11 Focus Not Obscured (Minimum): focus is visible and not hidden under the navigation bar or a toast.
- 2.5.8 Target Size (Minimum): 24 CSS pixels. Primary navigation and composer actions use 44, which is the enhanced target in 2.5.5, treated here as a recommendation for those controls.
- 2.1.1 Keyboard and 2.4.3 Focus Order: every control is reachable in an order that matches the layout. Dialog focus is trapped and returns.
- 4.1.2 Name, Role, Value: icon-only controls have accessible names, and toggles expose the new state.
- 2.2.2 Pause, Stop, Hide, and 2.3.3 Animation from Interactions: no autoplaying sound, no decorative loop, and non-essential motion stops when reduced motion is requested.
- 1.4.4 Resize Text and 1.4.10 Reflow: body text can grow, and the layout still works at the 390 pixel review width. Horizontal scrolling is for a carousel, not for the page.
- 2.5.7 Dragging Movements: a carousel can be operated with previous and next, not only with a swipe.

## 12. Visual QA

When a screen exists, Playwright captures it at 390, 768, and 1280, in light and dark, plus one pass with `prefers-reduced-motion: reduce`.

A baseline image changes only in the same change as an intentional visual edit.

Beside the screenshots, for that screen:

- Keyboard can reach every control, in an order that matches the layout.
- Focus is visible and returns after a dialog closes.
- Icon-only controls expose their accessible name.
- Contrast meets WCAG 2.2 AA for text and for the focus indicator.
- Reduced motion removes travel and keeps the state change.
- The mascot is absent unless the screen is one of the four allowed surfaces.
- Loading, empty, and error were exercised, not only the happy path.

No paid visual-regression service is part of the foundation. One screenshot of a happy path is not acceptance.

A screen is rejected until these defects are gone:

- Text or a focus ring uses a pair that fails the AA ratio for its role.
- The feed column is wider than the character target once the real font is loaded, or body text is below 16 px.
- Cards are so tall or so empty that the next post is pushed off a 390 pixel screen by chrome rather than by content.
- A control has no accessible name, a target under 24 CSS pixels, or focus that disappears.
- Loading shifts the layout, a failed image collapses the card, or an error has no retry.
- The mascot appears outside the four allowed surfaces, or a pose breaks the shared silhouette.
- Motion still travels when reduced motion is requested.
- A control is visible for an action the product does not perform.

Hierarchy, alignment, spacing, and density are judged on the three screenshots together. A pass on contrast does not excuse a sparse or repetitive layout.

## 13. Skills and libraries

Nothing in this file is an instruction to install a package during foundation work.

Use the already available `frontend-design`, `design-system`, and `web-design-guidelines` skills when building or reviewing a screen. Do not stack additional visual-direction skills on the same screen.

Later, and only in the slice that needs them: Tailwind for tokens and layout, Radix primitives copied into the repo for dialogs and menus, `lucide-react` for icons, CSS for motion, and `motion` only if a sheet or dialog cannot be done in CSS. TanStack Query arrives with the feed. There is no second component kit and no second icon set.

## 14. Open design choices

- Which of the three visual directions is approved. The working recommendation is A, with B's row alignment for threads and C reserved for media viewers.
- Mascot name. Default: "the radish."
- Hex values and Source Sans 3. They remain recommendations. The calculated contrast failures have to be resolved before those hex values can be approved.
- Exact durations inside the short and medium ceilings. Chosen in implementation, then checked.
- Bundle-size budget. Set after the shell is measured.
- Whether direct messages exist at all.

## 15. Approval gate before screens

**Owner decision still required.** Phase A ends at this document. Substantial frontend implementation waits for a separate approval of:

1. The selected visual direction.
2. The design tokens, including any hex values that replace a failing pair.
3. The component rules in section 7.
4. The mascot direction, using the seven-pose validation sheet, still without treating those seven as the finished library.
5. Representative desktop and mobile screens for the first text-social-graph journey.

Stitch is an appropriate tool for that exploration. It is not part of Phase A. An implemented screen is then checked against those approved screens and against section 12. A well-specified document is not itself that approval.
