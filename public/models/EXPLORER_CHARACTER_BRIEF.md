# Player character brief — `explorer.glb`

This is the design brief for the player-character asset expected at
`public/models/explorer.glb` (see `src/components/three/Player.jsx`, which
already contains the GLTF loading pipeline waiting for this file — no code
changes are needed once it's in place).

## Full generation prompt

Create a high-quality stylized low-poly 3D game character based on the
provided reference image.

**Character concept:** A young professional female AI / GenAI engineer and
futuristic digital-world explorer. Clearly recognizable human female
anatomy and silhouette.

**Body:** Natural feminine human proportions. Proper human-shaped torso with
shoulders, waist and hips. Natural arms with upper/lower arm proportions.
Proper hands and fingers. Natural legs with knees and ankles. Proper feet.
Visible neck. Natural human-shaped head. Adult professional appearance.
Realistic but slightly stylized for a 3D game.
Do NOT create: cylindrical torso/arms/legs, spherical head, sphere hands,
robot or mannequin anatomy, exaggerated proportions.

**Hair:** Replace the reference's short bob with a beautiful, clearly
defined medium/high ponytail — actual 3D hair geometry, naturally attached
to the back of the head, tied at the back, flowing downward/backward,
clearly visible from a rear third-person camera, clean stylized mesh,
believable volume, integrated naturally with the head.
Do NOT make the hair a sphere, cone, random polygon blocks, floating
geometry, helmet-shaped, or spiky.

**Face:** Clean stylized face, attractive but professional. Doesn't need
extreme detail — the character is normally viewed from behind in the game.

**Clothing:** Reference image is the main clothing inspiration. Dark
navy/black futuristic fitted jacket with subtle technical/cyan accents,
dark cargo-style trousers, practical black futuristic boots, clean
professional styling. The jacket needs a clearly defined, relatively flat
back panel suitable for adding custom branding later — **do NOT generate
any text or logos on the jacket, and do NOT put "AI" on the shirt.** The
"SA" branding is added separately after import, once the model's real UVs
are known.

**Style:** Polished stylized low-poly game character. Sophisticated,
futuristic, clean, professional, slightly anime-inspired but not
exaggerated. Suitable for a premium personal AI-engineer portfolio, visually
compatible with a dark futuristic sci-fi environment. Professional
technology engineer — not a soldier, warrior, superhero, fantasy character,
or robot.

**Materials:** Clean game-ready materials. Dark matte jacket with subtle
fabric/leather-like variation, dark trousers, dark boots, natural hair
material, subtle cyan technology accents. Avoid excessive metallic
surfaces.

**Silhouette (critical — normal camera is behind her):** From behind, must
immediately read as female human proportions + head + ponytail + shoulders
+ fitted jacket + waist + hips + legs + boots.

**3D model requirements:** Game-ready topology, clean mesh, no disconnected/
floating geometry, no intersecting major clothing/body parts, proper
humanoid structure, UV mapped, textured/material-ready, suitable for
real-time WebGL/Three.js rendering.

**Rigging:** Proper humanoid rig. Compatible with idle, walk, and ideally
run animation. Rig supports natural movement of hips, spine, shoulders,
arms, legs, feet, head. Ponytail should have bones/deformation so it can
move naturally while walking.

**Grounding:** Feet positioned cleanly at the model's ground/origin. No
large invisible base or unnecessary vertical offset beneath the character.

## Latest condensed prompt (single-paragraph form, ready to paste as-is)

Stylized low-poly female AI / GenAI engineer, professional adult woman,
natural feminine human anatomy and proportions, clearly human silhouette,
medium-high ponytail with actual 3D hair mesh naturally attached to the
back of the head, dark navy-black fitted futuristic technical jacket, clean
flat back jacket panel suitable for custom branding, dark cargo trousers
with subtle utility pockets, black futuristic lace-up boots, subtle cyan
technology accents on the jacket and clothing, sophisticated professional
technology aesthetic, polished stylized game character, slightly
futuristic, clean materials, game-ready topology, humanoid character, full
body, symmetrical neutral A-pose, suitable for automatic humanoid rigging
and animation, feet flat on the ground. The character should look like a
professional AI engineer exploring a futuristic digital world. Do not add
logos, text, letters, or branding to the clothing. Keep the back of the
jacket clean for adding custom "SA" branding later. Natural human anatomy
is critical. The torso, arms, legs, hands and head must have proper human
proportions. Do not make the character robotic, cylindrical, spherical,
mannequin-like, armored, exaggerated, sexualized, or cartoonishly
disproportionate.

## Reference image

A stylized 3D-rendered illustration of a young woman with a short brown bob,
standing confidently (one hand on hip, the other interacting with a
holographic UI panel) in a bright modern tech studio. Dark navy/black
quilted moto-style jacket over a light T-shirt with "AI" printed on the
chest (replace with the back-panel approach above), dark cargo-style
trousers with thigh pockets, black chunky lace-up boots, cyan holographic
accents on the jacket shoulder/collar.

## Non-negotiables (quick checklist)

- Low-poly / stylized — not photorealistic.
- Real humanoid anatomy — no cylinder torso/limbs, no sphere head/hands.
- Ponytail = actual hair mesh, not a floating shape.
- Jacket back left clean/flat — no text or logo baked in yet.
- Rigged, with at minimum idle + walk clips.
- Feet at rig origin, no built-in ground offset.
- Small-adult scale is fine loosely — exact world scale is tuned in code
  (`MODEL_SCALE` in `Player.jsx`) once the file exists.

## Suggested paths to an actual file

- **Image/text-to-3D generators with rigging support** — Meshy AI or Tripo
  AI can take the prompt above (and/or the reference image) directly and
  are built for exactly this; this machine has no local 3D tooling
  (confirmed: no Blender install), so a hosted generation service is the
  fastest path.
- A generated/sourced base mesh, auto-rigged via **Mixamo** (free idle/walk
  once a humanoid mesh is uploaded).
- A commissioned artist, using this brief directly.
- A close-enough stylized character from Sketchfab/itch.io as a base, with
  a texture/hairstyle swap.

## When the file lands

Drop it at `public/models/explorer.glb`. `Player.jsx`'s loader picks it up
automatically. Still needs manual tuning at that point (documented in code
comments in `Player.jsx`): `MODEL_SCALE`, `MODEL_YAW_OFFSET` if it faces the
wrong way, and `PLAYER_TORSO_Y` / `PLAYER_HEAD_OFFSET_Y` for first-person eye
height. The "SA" jacket integration and idle/walk animation wiring also need
a pass against the model's actual UVs/clip names.
