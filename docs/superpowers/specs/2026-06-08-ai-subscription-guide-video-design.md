# AI Subscription Guide Video Design

## Goal

Turn the article "如何最省钱的使用AI三巨头" into a concise Chinese social video that explains the regional-pricing idea, compares the three subscriptions, gives the recommended Apple ID regions, and closes with practical risk warnings.

The video should help a viewer understand the recommendation in about one minute without reproducing every operational detail from the article.

## Format

- Canvas: 1080 x 1920 portrait
- Target duration: 55-65 seconds
- Language: Simplified Chinese
- Audio: Mandarin voiceover; no mandatory music
- Delivery: HyperFrames Studio preview first; MP4 only after explicit approval

## Audience

Chinese-speaking users who regularly subscribe to ChatGPT, Gemini, or Claude and care about lowering recurring costs. The viewer may understand Apple ID basics but should not need prior knowledge of regional App Store pricing.

## Creative Direction

Use the website's Apple-inspired visual language:

- White and soft-gray surfaces
- Near-black primary text
- Blue highlights
- Inter and system sans-serif typography
- Spacious layouts, subtle borders, restrained shadows
- Animated comparison cards, counters, route lines, and warning panels

The result should feel like a premium information graphic, not a screen recording. Website screenshots may appear briefly as context, but the main visual language is reconstructed motion graphics.

## Narrative Structure

1. **Hook**: Three mainstream AI subscriptions can cost substantially less through regional App Store pricing.
2. **Price comparison**: ChatGPT about USD 11, Gemini about USD 15.8, Claude about USD 10.8 per month according to the captured article.
3. **Why it works**: Apple uses regional price tiers while exchange rates and local purchasing power change.
4. **Recommended regions**: Turkey for ChatGPT and Gemini; Nigeria for Claude.
5. **Basic flow**: Separate regional Apple ID, corresponding gift-card balance, then subscribe inside the iOS app.
6. **Risk and payoff**: Avoid frequent account switching and immediate heavy top-ups; prices and controls can change. Estimated annual saving for all three is USD 150-250+.

## Motion Plan

- Open immediately with three AI product cards and a large savings statement.
- Use animated number counters for prices.
- Draw map routes from the Apple App Store card to Turkey and Nigeria.
- Build the subscription flow as three connected steps.
- Present warnings with blue-to-amber emphasis and short icon-driven cards.
- End on a clean three-line recommendation and the annual-saving range.

Transitions should be quick but controlled: vertical card pushes, masked wipes, number morphs, and short depth shifts. Avoid excessive spins, glitch effects, or full-screen dark gradients.

## Content Guardrails

- State that prices are approximate and based on the captured article.
- Display "以 App Store 当日实际显示为准".
- Do not claim that a region will remain the cheapest.
- Do not guarantee account safety, payment success, or freedom from platform enforcement.
- Keep operational advice general; do not turn the video into instructions for bypassing identity, billing, or platform controls.

## Source Assets

- Captured website screenshots for contextual framing
- Captured Gemini SVG
- Existing repository logos for ChatGPT, Gemini, Claude, and Apple-style service cards where appropriate
- Captured Inter and JetBrains Mono font files

All external-looking product marks remain informational identifiers, not endorsements.

## Technical Structure

- One root `index.html` orchestrates voiceover and beat compositions.
- Six beat files live under `compositions/`.
- `DESIGN.md`, `SCRIPT.md`, and `STORYBOARD.md` are production references.
- `narration.wav`, `narration.txt`, and `transcript.json` provide timing.
- Every beat uses deterministic GSAP timelines registered with HyperFrames.
- Lint, validate, inspect, and midpoint snapshots must pass before preview handoff.

## Acceptance Criteria

- The complete story is understandable without reading the source article.
- All key prices and region recommendations match the captured page.
- The disclaimer is legible on screen.
- No text overlaps, clipping, missing assets, or empty frames.
- HyperFrames lint and validation complete with zero errors.
- A working Studio project URL is available for review.
