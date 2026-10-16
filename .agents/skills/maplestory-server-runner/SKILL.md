---
name: maplestory-server-runner
description: >-
  Master development, architecture, debugging, build, deployment, and release
  rules for MapleStory Server Runner v265 (customized SwordieMS Core,
  portable MariaDB on port 33066, bundled JDK 21, and Server263 distribution).
  Use whenever modifying, debugging, reviewing, building, deploying, testing,
  or packaging server code, Java/Python scripts, HEXA Matrix skills, boss
  systems, networking, database logic, or distribution files.
---

# MapleStory Server Runner v265 — Master Agent Skill

## 0. Mission & Operating Principles

Maintain the existing customized MapleStory Server Runner as a stable, portable,
offline/LAN-capable server distribution.

Priority order:
1. Preserve existing working behavior and project-specific modifications.
2. Prevent data loss, regressions, crashes, and broken client compatibility.
3. Verify actual source, APIs, configuration, database schema, and runtime behavior.
4. Make the smallest complete change that solves the requested problem.
5. Build, deploy, test, document, and package only when their respective gates pass.

**Never assume the upstream SwordieMS implementation matches this project.**
The checked-out source, current configuration, database schema, scripts, and
working distribution are authoritative.

Do not claim 100% correctness without evidence. Report untested behavior explicitly.

## 1. Mandatory Project Rules

### 1.1 Source of Truth and Deployment Targets

- Java development source: `v214 src/`.
- Primary distribution: `Server263/`.
- Primary deployable JAR: `Server263/maplestory.jar`.
- Root `maplestory.jar` and any additional legacy JAR destinations must be
  maintained when required by the actual launchers and project workflow.
- Build entry point: `2_Build_Server.bat`, or the verified Maven command
  `mvn clean package -DskipTests` from the correct source directory.
- Patch output: `Patches/Server263_Patch_Latest.zip`.
- Patch builder: `tools/create_patch.py`.
- Root progress: `PROGRESS.md`.
- Root agent rules: `AGENTS.md`.
- User documentation: `docs/`.

Before modifying deployment behavior, inspect the actual scripts and paths.
Do not assume every listed file or destination currently exists.

`Server263/` is a distribution directory, not a development workspace.
Never place Java source trees, Maven caches, build tools, temporary test files,
or unrelated development artifacts inside it.

### 1.2 Portability — No Machine-Specific Paths

All distributed launchers and configuration generators must work when the
installation directory is moved between drives, folders, USB storage, or PCs.

- Batch scripts must resolve their own location using `%~dp0`.
- Resolve child paths from the installation root, not the current working directory.
- Quote paths containing spaces.
- Generate MariaDB configuration dynamically from the current installation path.
- Default database port: `33066`; fallback port: `33076` only when the
  existing recovery logic explicitly supports it.
- Do not hardcode development-machine paths in distributed configurations.
- Do not depend on globally installed Java, Maven, or MariaDB when the
  distribution is designed to bundle its own runtime.
- Verify the actual bundled JDK version and executable path before changing
  launch commands.
- Remove or regenerate stale path-dependent MariaDB configuration only after
  verifying the target file and ensuring the operation is safe.
- Never delete database files, player data, or configuration indiscriminately.

A successful portability check must include paths with spaces and a location
different from the original development directory when practical.

### 1.3 Clean Distribution and Temporary Files

Keep the root directory limited to required launchers, project instructions,
progress documentation, approved database backup files, and required runtime
artifacts.

- Store user-facing guides in `docs/`.
- Do not create `scratch/` or leave temporary scripts, logs, or test artifacts.
- Remove temporary artifacts created during the task before finishing.
- Store durable project handoff information only in `PROGRESS.md` and `AGENTS.md`.
- Keep generated binaries and patch files only in their approved destinations.
- Never delete pre-existing user files merely to satisfy directory cleanliness.

### 1.4 Preserve Existing Customizations

Before changing a subsystem:
1. Locate its implementation, callers, configuration, and related scripts.
2. Read the relevant existing code and recent project progress.
3. Identify project-specific behavior that must remain intact.
4. Check the actual method signatures, enums, packet structures, and data models.
5. Trace related code paths before introducing new helpers or replacing logic.

Prefer minimal, targeted changes over broad refactoring.

Do not duplicate centralized card/skill/boss/network knowledge in multiple places
when a shared implementation already exists.

## 2. Architecture and Technical Reference

### 2.1 Network and Routing

Default ports:

| Service | Port |
|---|---:|
| MariaDB primary | 33066 |
| MariaDB fallback | 33076 |
| Login | 8484 |
| API | 8483 |
| World 19 (Scania), Channels 1–10 | 8585–8594 |

Project-specific routing requirements:

- `Localhost.dll` obtains the configured address from `launcher.ini`.
- Do not replace dynamic configuration with hardcoded `127.0.0.1`.
- `NettyClient.getEffectiveChannelIp()` must preserve the intended distinction:
  local clients receive the localhost address; remote LAN/VPN clients receive
  the configured externally reachable address.
- Channel switching must preserve connectivity for both local and remote clients.
- Validate address selection, advertised IPs, ports, and firewall requirements
  before changing networking code.

Do not assume that a configured IP is reachable. Configuration correctness and
actual network reachability are separate checks.

### 2.2 Database

- Database: `vietmaple`.
- Encoding: UTF-8-compatible configuration verified against the actual schema.
- Connection pool: HikariCP.
- Expected schema reference: approximately 110 tables; verify the real database
  before relying on this count.
- Portable MariaDB must not overwrite existing player data during startup.

**Transaction safety rules:**

- In `QuestProgressRequirement.saveToSQL`, reuse the active transaction's
  `Connection con` when performing related transactional writes.
- Do not open an independent `DatabaseManager` connection inside that
  transaction; doing so can introduce lock contention, deadlocks, and
  inconsistent commit behavior.
- `questprogressrequirements` does not contain `charid`; the account-quest
  table `questprogressrequirements_acc` is distinct.
- Verify schema and migration compatibility before changing SQL.
- Use prepared statements for values and close resources safely.
- Never solve database errors by blindly deleting tables or resetting data.

Preserve transaction boundaries and verify rollback/error behavior for
database changes.

## 3. HEXA Matrix and Sixth Job Skills

### 3.1 Origin Skills

For each custom Origin implementation, inspect the actual skill handler,
attack handler, packet API, and client compatibility before editing.

Required project behavior where applicable:

- During `handleSkill()`, apply the intended temporary invulnerability using
  `CharacterTemporaryStat.IndieNotDamaged` and the verified option format.
- Send the party cutscene/effect packet using the verified
  `UserLocal.showHexaSkillEff(chr, skillID)` API.
- During `handleAttack()`, apply the intended Absolute Bind using the verified
  `MobStat.Freeze` implementation and duration.
- Apply `MobStat.OriginDebuff` using the project's supported
  `EnumMap<MobStat, Option>` representation where applicable.
- Enforce the intended 360-second cooldown on the authoritative server side.

Do not blindly apply generic durations or effects to every class. Verify actual
skill IDs, class mechanics, cooldown ownership, and existing handlers.

### 3.2 Ascent Skills and Transformation State

For multi-stage skills, such as a sequence of Ascent attacks:

- Model the sequence as explicit states and valid transitions.
- Use `UserLocal.registerExtraSkill` only where supported by the existing API.
- Validate required buffs and states, including `Holding` where applicable.
- Reject invalid transitions, duplicate finishers, and attacks after termination.
- On completion or cancellation, clear temporary state and buffs as required.
- Remove related summons where appropriate.
- Start the full intended cooldown, such as 240 seconds, at the correct point.
- Prevent packet duplication, state desynchronization, and zero-cooldown loops.

Verify normal completion, interruption, death, map transfer, and reconnect behavior.

### 3.3 Matrix UI Integrity — No Phantom Sub-Skills

For helper skills whose WZ data includes
`<int name="invisible" value="1"/>`:

- Keep internal helper skills out of visible skill lists and Matrix UI.
- Never send skill-removal/update packets to the client for these helpers when
  the operation must be server-only.
- Use `removeSkill` instead of `removeSkillAndSendPacket` for the relevant
  silent-removal operation, after verifying the API.
- In `Char.encode` / `SkillRecord`, apply the project's existing filters for
  `SkillConstants.isSpecialInvisibleSkill` and `!si.isInvisible()` as appropriate.
- In `Skill.getSkillsFromSQLByCharID`, purge only verified invalid helper-skill
  records at level 0 when safe to do so.
- Never delete legitimate learned skills or nonzero-level records.
- Prevent repeated skill execution by validating the main skill's state,
  buff requirements, and cooldown in `SkillHandler` and `AttackHandler`.

Database cleanup must be narrowly scoped, safe to repeat, and verified against
the actual SQL schema.

### 3.4 Super Buff All

Preserve the project's command-access model:

- `@buff` and `@buffall`: ordinary-player commands where currently supported.
- `!buffall`: admin-only command.
- Maple Admin NPC: retain the configured Super Buff All menu and intended
  2-hour duration where implemented.
- Preserve configured EXP, drop, attack, boss damage, IED, and speed bonuses.

Before changing the buff list, inspect actual skill definitions, stacking rules,
duration limits, and class restrictions. Do not invent skill IDs or assume every
buff stacks.

## 4. Boss Entry Architecture

### 4.1 Centralized BossEntry

`BossEntry.java` is the intended central entry point for the project's
129 boss definitions.

Preserve the following behavior where already implemented:

- Boss UI / Content Guide match-button entry.
- Private-instance handling where required.
- Unlimited daily or weekly runs for the intended offline/LAN configuration.
- Optional storyline prerequisite bypass controlled by
  `server.bossUnlockPrequests=true`.
- Automatic prerequisite completion in `Char.initQuests()` only when the
  setting is enabled.

Never assume all 129 entries have equivalent mechanics. Audit each affected
boss's actual entry map, requirements, scripts, and return destination.

### 4.2 Altars, Reactors, and Exits

For bosses requiring an altar or reactor:

- Inspect the relevant script under `data/scripts/reactor/`.
- Spawn and remove the reactor using the project's actual supported lifecycle.
- Call `cleanReactor()` where appropriate to prevent repeated activation.
- Avoid duplicate boss spawns and stale reactor states.

Every custom boss instance must have a verified exit path through its intended
NPC, portal, `sm.exitBoss()`, or forced-return mechanism.

Check success, failure, death, party changes, instance cleanup, and re-entry.
Do not apply a generic exit handler without confirming its destination and
instance ownership.

## 5. Admin Testing and Public Security

### 5.1 Private Test Commands

The `!endgame`, `!test6`, and `!boost` commands, including
`!endgame <class_name>`, are developer-only testing utilities.

- Enforce authorization through the actual admin permission system.
- Preserve the intended `requiredType = Admin` access rule.
- Keep test commands out of ordinary-player NPCs and public-facing commands.
- Never rely on a command name or hidden UI alone as authorization.
- Verify permissions on the server, not only on the client.

The test account `admin` / `admin` is a development reference, not a safe
public credential. Do not expose default credentials in public documentation
or ship an accessible default admin account without a deliberate, secure
initialization process.

### 5.2 Strict Zero Skill Injection

The endgame preparation command must not directly inject learned or HEXA skills.

Forbidden in `!endgame`:
- `chr.addSkill`
- `chr.setHexaSkill`
- `mc.setSkillLevel`

Preserve the intended preparation behavior where implemented:

- Set character level to 260.
- Restore HP/MP.
- Allocate the intended 1,250 AP.
- Complete job 5 quests 1460–1466 and job 6 quest 1488 using
  `noRewards = true` where supported.
- Grant the intended SP through `ExtendSP`, so normal skill allocation remains
  responsible for learning skills.
- Grant Nodestones x3,000 (item 2435719), Experience Nodestones x20,
  Sol Erda Energy x1,000, Sol Erda Fragments x30,000, Power Elixirs x3,000.
- Grant the configured Arcane Umbra equipment set, Princess No Secondary,
  Emblem, and 10B Mesos where valid for the character.

Verify item IDs, inventory capacity, job compatibility, quest reward behavior,
and actual SP semantics before editing these values.

Players must open Nodestones, unlock HEXA Matrix cores, and allocate SP through
the game's intended mechanics. Never silently bypass those mechanics.

## 6. Standard Development Workflow

Follow the sequence below, adapting only when the task does not require a
particular stage.

### Stage A — Inspect

1. Read `AGENTS.md`, relevant `PROGRESS.md` entries, and related documentation.
2. Inspect the working tree and identify pre-existing user changes.
3. Locate the source, scripts, configs, data, and callers involved.
4. Verify APIs, IDs, schema, and expected behavior.
5. Record the root cause before changing code.

Do not overwrite, discard, or reformat unrelated user changes.

### Stage B — Plan

Define:
- The requested behavior and acceptance criteria.
- The smallest safe change.
- Affected files and dependent systems.
- Regression risks and required tests.
- Deployment and rollback implications.

If the requested behavior conflicts with an existing project rule, resolve the
conflict explicitly rather than silently ignoring either requirement.

### Stage C — Implement

- Follow the project's existing Java/Python conventions and API patterns.
- Reuse existing helpers and centralized definitions.
- Avoid duplicated logic, arbitrary constants, and unnecessary refactors.
- Add validation and safe error handling where needed.
- Preserve configuration defaults unless the task explicitly changes them.
- Keep secrets, credentials, and machine-specific paths out of public artifacts.

### Stage D — Build

1. Run the verified project build command from the correct directory.
2. Inspect the complete build result.
3. Resolve errors caused by the change.
4. Record warnings relevant to the changed code.
5. Confirm the generated JAR is the intended artifact.

A successful compile does not prove runtime correctness.

### Stage E — Deploy

- Deploy the verified JAR to `Server263/maplestory.jar`.
- Update Root and `v214 src/` JAR destinations only as required by the actual
  launchers and established project workflow.
- Confirm file identity, timestamp, or checksum where practical.
- Preserve the previous working artifact until rollback is no longer needed.
- Never deploy an unverified or stale build accidentally.

### Stage F — Test

Run the tests relevant to the change:

- Build and startup.
- Server logs and exceptions.
- Database connectivity and persistence.
- Localhost and remote LAN/VPN routing when affected.
- Client packet compatibility and crash behavior.
- Actual in-game behavior for changed skills, bosses, or commands.
- Reconnect, cleanup, cooldown, and regression cases where relevant.

**In-game verification is mandatory before creating a release patch for code
changes when the required environment is available.**

If the client, server environment, or required test access is unavailable:
- Run the strongest feasible alternative tests.
- Clearly identify what was and was not tested.
- Do not claim in-game success.
- Do not mark the release patch as fully verified.

### Stage G — Package Patch

Only after all applicable test gates pass:

1. Run `tools/create_patch.py` using the verified project procedure.
2. Generate `Patches/Server263_Patch_Latest.zip`.
3. Ensure `Patches/` contains only that approved release ZIP.
4. Do not create timestamped duplicate release archives.
5. Verify archive contents, relative paths, and required replacement files.
6. Exclude source code, build tools, scratch files, logs, credentials, and
   unnecessary database files.
7. Never include the approximately 5 GB `data/wz265/` tree in the patch.
8. Preserve the full WZ data; users should apply the patch with `Apply_Patch.bat`
   rather than re-compressing the complete distribution.

If a release gate fails, do not overwrite the last known-good release patch.

### Stage H — Document and Synchronize

Update:
- Root `PROGRESS.md`.
- `v214 src/PROGRESS.md`.
- `AGENTS.md` only when durable agent instructions or architecture rules change.
- Relevant documents in `docs/`.

Use the actual local date and time. Each progress entry should be concise and
follow:

**Problem → Cause → Fix → Outcome**

Keep the two progress files synchronized for the same change. Report the actual
build, test, deployment, and patch status separately.

### Stage I — Git Review and Push

When Git synchronization is part of the task or release workflow:

1. Inspect `git status` and the diff.
2. Identify unrelated pre-existing modifications and untracked files.
3. Review all intended source, configuration, script, and documentation changes.
4. Stage all intended task changes, including documentation; do not silently
   omit required files.
5. Check for secrets, passwords, database dumps, generated binaries, and large
   data files before committing.
6. Commit and push only when authorized, the repository and remote are correct,
   and all release gates are satisfied.

`git add .` is not permission to publish secrets or unrelated user files.
Never force-push, discard user changes, or commit sensitive data just to satisfy
the requirement to synchronize everything.

## 7. Verification and Failure Handling

For each task, determine the applicable checks rather than running unrelated
expensive tests.

Minimum reporting categories:

- Source changes: files changed and root cause addressed.
- Build: command used and actual result.
- Deploy: destinations updated and verification performed.
- Runtime: startup and log status.
- In-game: exact scenario tested, or explicit untested status.
- Patch: archive generated and contents checked, or not generated.
- Git: commit/push status, or reason not performed.
- Remaining risks: unresolved failures and required manual verification.

When a failure occurs:
1. Capture the relevant error and reproduce it when practical.
2. Identify the responsible layer.
3. Fix the root cause rather than masking the symptom.
4. Re-run the relevant regression tests.
5. Preserve the last known-good build and release artifacts.

Never report a command as successful merely because it was launched.

## 8. Context and Completion Rules

- Treat this file as the concise project policy; inspect source and detailed
  documentation when implementation specifics are required.
- Do not assume undocumented IDs, signatures, ports, paths, or game behavior.
- Prefer verified code and current runtime evidence over stale documentation.
- Avoid copying this entire guide into every task response.
- Do not create secondary handoff files.
- Do not change public-facing gameplay, rewards, security, or database semantics
  beyond the user's requested scope.

A task is complete only when its requested outcome is implemented and the
applicable verification results are reported honestly.

Final response format:

1. **Problem / Root Cause**
2. **Changes Made**
3. **Build & Deployment**
4. **Tests Passed / Not Run**
5. **Patch & Git Status**
6. **Remaining Risks / Manual Checks**

Never label a change fully verified if a mandatory test could not be performed.
