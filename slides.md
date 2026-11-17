---
theme: default
title: TC Detector · Sprint 1 Presentation
info: |
  Sprint 1 review of the Technical Credit (TC) Detector VS Code extension:
  what we built, the pilot study, and what comes next.
author: TechnicalCredit team
layout: cover
colorSchema: dark
mdc: true
transition: slide-left
lineNumbers: false
drawings:
  persist: false
fonts:
  sans: Inter
  serif: Inter
  mono: JetBrains Mono
  provider: none
addons:
  - slidev-addon-timing-bar
  - '@alukach/slidev-addon-laser'
  - '@alukach/slidev-addon-hotkeys'
themeConfig:
  laserColor: '#FF7900'
  laserWidth: 6
  laserFade: 900
duration: 20min
timer: countdown
---

<div class="kicker c-orange">SPRINT 1 PRESENTATION</div>

# Technical Credit Detector

<p class="text-xl c-text2">Does an LLM tell design that pays off from code that only looks like a pattern?</p>

<div class="flex gap-6 mt-8">
  <div class="stat-mini"><span class="c-green">2.1%</span> flip rate</div>
  <div class="stat-mini"><span class="c-orange">$0.055</span> per analysis</div>
  <div class="stat-mini"><span class="c-blue">23 / 23</span> feature checks pass</div>
</div>

<p class="small c-muted mt-8">TechnicalCredit team · Sprint 1 review · 17 Nov 2026</p>

---
layout: divider
part: 1
minutes: 2 min
---

# Project goal

What Technical Credit is, and what the detector does

---

# What is Technical Credit?

<div class="key mt-1">"The <b>measurable benefit</b> arising from design or infrastructure decisions which, through deliberate investment or balanced trade-offs, create <b>enduring advantages for system evolution</b>."<span class="src">Working definition: technical.credit [1]; Bucaioni, Gorton, Pelliccione, ICSE 2026 SEIP [3]</span></div>

<div class="grid grid-cols-3 gap-4 mt-5">
  <div class="panel red">
    <div class="head c-red"><tabler-trending-down class="icon" /> Debt names the drag</div>
    <p class="small">Future cost and friction from expedient choices. Credit is its <b>complement</b>, not its opposite: one design can be both credit and debt at once [3].</p>
  </div>
  <div class="panel green">
    <div class="head c-green"><tabler-trending-up class="icon" /> Credit names the capacity</div>
    <p class="small">Deliberate investment <b>or a balanced trade-off</b>; extra upfront cost is not required [3]. E.g. an edge service wrapping an email vendor [2].</p>
  </div>
  <div class="panel orange">
    <div class="head c-orange"><tabler-coin class="icon" /> Realised upon use</div>
    <p class="small">Credit pays off when the anticipated change happens. If the vendor never changes, it was over-engineering (YAGNI) [2].</p>
  </div>
</div>

<div class="insight mt-5">
  <div class="cue c-blue"><tabler-users class="icon" /> Industry view</div>
  <div class="small">31 practitioners + 6 interviews: three quarters agreed with the definition, but <b>74%</b> cite unclear ROI and over half the lack of agreed metrics as barriers [3, 4].</div>
</div>

---

# Where the TC Detector fits

The research agenda [4] calls for <b>detecting</b> TC in existing code, using an LLM to find candidate <b>design dividends</b>: observable signs of TC, as code smells are signs of debt.

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="panel blue">
    <div class="head c-blue"><tabler-code class="icon" /> TC Detector (this project)</div>
    <p class="small">A VS Code extension: analyse a Java class, propose an <code>@TechnicalCredit</code> annotation with <b>benefit</b>, <b>conditions</b> and <b>signals</b>, linked to a matching ADR.</p>
    <div class="mt-2">
      <span class="badge">abstraction</span><span class="badge">api-stability</span><span class="badge">automation</span><span class="badge">compliance-readiness</span>
      <span class="badge">configurability</span><span class="badge">modularity</span><span class="badge">observability</span><span class="badge">reusability</span>
    </div>
    <p class="small c-text2 mt-1"><b>8 categories today</b>, one prompt each. <code>knowledge-preservation</code> (ADRs, rationale) is planned, to match the 9 in the APSEC draft [6] and TC-ADR [5].</p>
  </div>
  <div class="panel purple">
    <div class="head c-purple"><tabler-file-description class="icon" /> TC-ADR Manager [5]</div>
    <p class="small">Extends <code>vscode-adr-manager</code>: MADR records gain <b>Benefit</b>, <b>Conditions</b>, <b>Signals</b>, Confidence, Status and Related Decisions. ADRs are the second-highest-rated TC scenario (4.13 / 5) [3].</p>
    <p class="small mt-2 c-text2">We share Benefit and Conditions. Our <code>signals</code> are code evidence, theirs are signs of realisation. ADR linking is <b>read-only</b> today: we match an existing ADR, but never create one or link back. ADR creation, which the APSEC draft describes, is planned [6].</p>
  </div>
</div>

<div class="key mt-4"><b>Sprint 1 goal:</b> make the extension safe to use, then <b>measure</b> how accurate, stable, fast and cheap it is, and whether it detects credit that <i>pays off</i> or only pattern shape. No prompt changes this sprint.</div>

---

# How a class is judged

```mermaid
flowchart LR
  A["Right-click<br/>Analyse for TC"] --> B["tree-sitter<br/>class + imports + metrics"]
  B --> C["8 parallel Claude calls<br/>one per category (9th planned)"]
  C --> D["JSON verdicts<br/>is_tc_candidate, benefit, …"]
  D --> E["Preview annotation<br/>Accept / Dismiss"]
```

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="panel dim"><div class="head"><tabler-cpu class="icon c-blue" /> Model</div><p class="small"><code>claude-sonnet-4-6</code>, temperature 0 by default</p></div>
  <div class="panel dim"><div class="head"><tabler-link class="icon c-purple" /> ADR linking</div><p class="small">Read-only: Markdown ADRs under <code>docs/</code> are matched and cited as <code>adr = "ADR-0001"</code>. Planned: create a TC-ADR from an annotation, with a two-way link [6].</p></div>
  <div class="panel dim"><div class="head"><tabler-file-code class="icon c-green" /> Output</div><p class="small">Accepted annotations generate a <code>TechnicalCredit.java</code> annotation type</p></div>
</div>

---
layout: divider
part: 2
minutes: 5 min
---

# What we built

Build and Claude config, then a safe annotation lifecycle

---

# Build and Claude configuration

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="panel orange">
    <div class="head c-orange"><tabler-key class="icon" /> API key in SecretStorage</div>
    <p class="small">New commands <b>Set API Key</b> and <b>Clear API Key</b>. Masked prompt; stored in VS Code SecretStorage instead of a shell variable.</p>
  </div>
  <div class="panel blue">
    <div class="head c-blue"><tabler-adjustments class="icon" /> Model and temperature</div>
    <p class="small">Settings <code>technicalcredit.model</code> / <code>.temperature</code>, overridden by <code>TC_MODEL</code> / <code>TC_TEMPERATURE</code>. Defaults: <code>claude-sonnet-4-6</code>, <code>0</code>.</p>
  </div>
  <div class="panel red">
    <div class="head c-red"><tabler-alert-triangle class="icon" /> Typed error kinds</div>
    <p class="small">
      <span class="pill warn">missing-key</span><span class="pill warn">auth</span><span class="pill warn">timeout</span><span class="pill warn">network</span><span class="pill warn">rate-limit</span><span class="pill warn">model</span><span class="pill warn">bad-request</span><span class="pill warn">bad-response</span><span class="pill warn">config</span>
    </p>
    <p class="small mt-1">Each maps to a message written for the user, not raw SDK text.</p>
  </div>
  <div class="panel green">
    <div class="head c-green"><tabler-package class="icon" /> <code>.vsix</code> packaging</div>
    <p class="small"><code>npm run vsix</code> builds an installable package. Only 9 runtime files ship; the pilot study data is excluded.</p>
  </div>
</div>

<div class="key mt-4">The runner logs requested and returned model, temperature, tokens and latency for every call, so cost is <b>measured</b>, not estimated.</div>

---

# Annotation lifecycle: 7 fixes

<div class="compact mt-2">

| Before (baseline run: 10 pass, 7 fail) | After (retest: all pass) |
| --- | --- |
| <span class="c-red">Dismiss after an edit deleted the wrong lines; a new analysis deleted real code</span> | Ranges track edits; stale previews are dropped, never deleted blind |
| <span class="c-red">Accepted annotations broke <code>javac</code></span> | Valid Java: <code>javac -Xlint:all</code> passes |
| <span class="c-red">Re-analysis echoed and duplicated annotations</span> | Already-accepted categories are skipped |
| <span class="c-red">Undo left orphan CodeLenses and highlights</span> | Text, CodeLenses and highlights undo together |
| <span class="c-red">Enums and records rejected with a misleading message</span> | Enums and records are analysed |
| <span class="c-red">Pending previews became "accepted" after reload or close</span> | Previews persist in workspace state and are re-verified |
| <span class="c-red">Activated on <code>*</code> in every workspace</span> | <code>onLanguage:java</code> |

</div>

<p class="src">Source: vscode-feature-test-report.md, original run on 9e95f85, retest on cf6cf0c</p>

---
class: wide
---

# Accepted annotations now compile

<div class="grid grid-cols-2 gap-5 mt-2 items-start">
  <figure class="fig">
    <div class="small c-red mb-2"><tabler-x class="icon" /> Before: <code>key: 'value'</code> pairs, <code>javac</code> errors</div>
    <img src="/images/tc-feature-accepted-javac-error.png" class="shot" />
  </figure>
  <div>
    <figure class="fig">
      <div class="small c-green mb-2"><tabler-check class="icon" /> After: Java annotation syntax, <code>JAVAC_OK</code></div>
      <img src="/images/tc-regression-08-javac-ok.png" class="shot" />
    </figure>
    <div class="key mt-5 small">Accepted annotations in 3 files, plus the generated <code>TechnicalCredit.java</code>, compile with <code>javac -Xlint:all</code>.</div>
  </div>
</div>

---

# Regression retest: everything passes

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="stat green"><div class="num">17 / 17</div><div class="lbl">original feature tests</div></div>
  <div class="stat blue"><div class="num">6 / 6</div><div class="lbl">additional checks</div></div>
  <div class="stat orange"><div class="num">3</div><div class="lbl">new bugs found, all fixed</div></div>
</div>

<div class="grid grid-cols-2 gap-5 mt-6">
  <div>
    <div class="head small c-text2 mb-1">Found and fixed during the retest</div>
    <ul class="small">
      <li><b class="c-red">High:</b> pending previews silently became "accepted" after a reload (<code>c7dc1ae</code>)</li>
      <li><b class="c-orange">Medium:</b> the <code>.vsix</code> shipped the pilot study data (<code>889023d</code>)</li>
      <li><b>Low:</b> "No TC detected" now names the enum or record (<code>cf6cf0c</code>)</li>
    </ul>
  </div>
  <div>
    <div class="head small c-text2 mb-1">Gate before every push</div>
    <span class="badge">tsc:check</span><span class="badge">lint:check</span><span class="badge">format:check</span><span class="badge fill">70 offline Jest tests</span>
    <p class="small mt-3 c-text2">Clean VS Code 1.146 profile, installed from the <code>.vsix</code>; 10 live analyses, 98 Claude calls.</p>
  </div>
</div>

---
layout: divider
part: 3
minutes: 4 min
---

# Pilot study design

Twin items, three label dimensions, a runner and pre-registered hypotheses

---

# Twin items: credit vs. look-alike

Each GoF pattern written twice: once where it **pays off**, once where it only **looks** like it does.

<div class="compact mt-3">

| Pair | Credit twin (primary category) | No-credit twin |
| --- | --- | --- |
| **Strategy** | `QuoteService` picks an injected `RateRule` from a property <span class="badge c-blue">configurability</span> | Same shape, one `RateRule` built inline, no config |
| **Adapter** | `EmailNotifier` implements a domain `Notifier` over a vendor client <span class="badge c-purple">abstraction</span> | `EmailSender` forwards vendor calls one-for-one |
| **Observer** | `StockLevels` with runtime subscribe / unsubscribe <span class="badge c-green">modularity</span> | Same shape, one listener hard-wired with `new` |

</div>

<div class="grid grid-cols-3 gap-4 mt-5">
  <div class="panel dim"><div class="head small"><tabler-eye-off class="icon c-orange" /> No leaks</div><p class="small">No comments, neutral package <code>app</code>, no <code>Strategy</code>/<code>Adapter</code> suffixes</p></div>
  <div class="panel dim"><div class="head small"><tabler-ruler class="icon c-orange" /> Size-matched</div><p class="small">Twins within 30% line count, checked by a unit test</p></div>
  <div class="panel dim"><div class="head small"><tabler-shape class="icon c-orange" /> Same structure</div><p class="small">2 of 3 look-alikes keep interface + implementation</p></div>
</div>

---

# Labels, runner and metrics

<div class="grid grid-cols-3 gap-4 mt-2">
  <div class="panel blue">
    <div class="head c-blue"><tabler-tags class="icon" /> Three label sets</div>
    <ol class="small">
      <li><b><code>tc</code></b>: item-level yes / no</li>
      <li><b><code>categories</code></b>: yes / no / unsure for all 8</li>
      <li><b><code>designPatterns</code></b>: GoF roles, matching upstream PR #145</li>
    </ol>
  </div>
  <div class="panel orange">
    <div class="head c-orange"><tabler-player-play class="icon" /> Runner</div>
    <p class="small"><code>npm run pilot -- run</code> reuses the production path.</p>
    <p class="small mt-2"><b>6 items × 5 repeats × 8 heuristics = 240 calls</b>, written to <code>calls.jsonl</code> with tokens and latency.</p>
  </div>
  <div class="panel purple">
    <div class="head c-purple"><tabler-chart-dots class="icon" /> Metrics</div>
    <p class="small">Unit: (item, category) pair, 6 × 8 = 48. Majority vote over repeats.</p>
    <p class="small mt-2">Flip rate · pooled P/R/F1 · item accuracy · twin discrimination · cost · latency</p>
  </div>
</div>

<div class="insight mt-5">
  <div class="cue c-orange"><tabler-scale class="icon" /> Baselines</div>
  <div class="small">Always-yes / always-no, and a <b>pattern-presence oracle</b>: a perfect "is there a GoF pattern here?" check. Beating it means the detector sees <i>credit</i>, not just patterns.</div>
</div>

---

# Pre-registered hypotheses

Committed before the first billed run; thresholds evaluated mechanically.

<div class="compact mt-3">

| ID | Hypothesis | Tests |
| --- | --- | --- |
| **H1** | Flip rate below 5% of (item, category) pairs | Stability |
| **H2** | Primary category fires on at least 2 of 3 credit twins | Recall on the intended credit |
| **H3** | In at least 2 of 3 pairs, primary fires on the credit twin and not on its look-alike | Twin contrast |
| **H4** | Pooled F1 beats always-yes **and** accuracy beats always-no | Better than trivial |
| **H5** | Item-level accuracy beats the pattern-presence oracle | Credit, not pattern |
| **H6** | p95 latency per analysis below 10 s | Usability |

</div>

---
layout: divider
part: 4
minutes: 6 min
---

# Results

`claude-sonnet-4-6`, temperature 0, commit `5fedccc`, 240 calls, 0 errors

---

# Headline numbers

<p class="small c-text2">Against the APSEC draft's research questions [6]: <b>RQ3</b> (consistency) gets a direct answer, <b>RQ2</b> (accuracy) its first quantitative evidence.</p>

<div class="grid grid-cols-4 gap-3 mt-2">
  <div class="stat green"><div class="num">2.1%</div><div class="lbl">flip rate · RQ3<br/><span class="c-muted">1 of 48 pairs · target &lt; 5%</span></div></div>
  <div class="stat orange"><div class="num">4 / 6</div><div class="lbl">items classified right<br/><span class="c-muted">pattern oracle also 4 / 6</span></div></div>
  <div class="stat blue"><div class="num" style="font-size: 1.55rem; white-space: nowrap">7.6 / 9.1 s</div><div class="lbl">latency p50 / p95<br/><span class="c-muted">target p95 &lt; 10 s</span></div></div>
  <div class="stat purple"><div class="num">$0.055</div><div class="lbl">per analysis (8 calls)<br/><span class="c-muted">$1.66 for the whole run</span></div></div>
</div>

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="panel dim">
    <div class="head small c-text2">Pooled pair-level F1 · RQ2</div>
    <Bar label="Detector" :value="26.7" color="var(--orange)" />
    <Bar label="Always yes" :value="19.6" color="var(--muted)" />
    <p class="small c-green mt-1">Beats always-yes</p>
  </div>
  <div class="panel dim">
    <div class="head small c-text2">Pooled pair-level accuracy · RQ2</div>
    <Bar label="Detector" :value="76.1" color="var(--orange)" />
    <Bar label="Always no" :value="89.1" color="var(--muted)" />
    <p class="small c-red mt-1">Loses to always-no, so H4 fails</p>
  </div>
</div>

---

# Hypotheses: 4 pass, 2 fail

<div class="grid grid-cols-3 gap-3 mt-3">
  <div class="hyp pass"><b>H1</b> Stability<span>2.1% flips</span></div>
  <div class="hyp pass"><b>H2</b> Primary fires<span>2 of 3 credit twins</span></div>
  <div class="hyp pass"><b>H3</b> Twins told apart<span>2 of 3 pairs</span></div>
  <div class="hyp fail"><b>H4</b> Beats trivial baselines<span>F1 yes, accuracy no</span></div>
  <div class="hyp fail"><b>H5</b> Beats pattern oracle<span>4 / 6 vs 4 / 6</span></div>
  <div class="hyp pass"><b>H6</b> p95 &lt; 10 s<span>9.1 s (borderline)</span></div>
</div>

<div class="grid grid-cols-2 gap-4 mt-5">
  <div class="panel green"><div class="head small c-green">RQ3 · consistency: answered</div><p class="small">H1: 2.1% flips at temperature 0 (0% in the replication), 240 calls, 0 errors. Stability is largely solved at temperature 0.</p></div>
  <div class="panel red"><div class="head small c-red">RQ2 · accuracy: first evidence, negative</div><p class="small">H4 and H5 fail: it doesn't beat always-no or a pattern-presence oracle. <b>Validity</b>, not stability, is the open problem.</p></div>
</div>

<p class="src">Replication run (same code): same scores, except 0% flips and p95 10.1 s, which fails H6 by 0.1 s.</p>

---

# Why: it sees the structure, not the payoff

<div class="grid grid-cols-3 gap-4 mt-3">
  <div class="panel red">
    <div class="head c-red"><tabler-mask class="icon" /> Look-alikes</div>
    <p class="small">The one-implementation strategy and the hard-wired observer are flagged as TC on <b>every</b> repeat. The plain forwarder is correctly ignored.</p>
    <p class="small mt-2 c-text2">It flags <i>potential</i> credit, but can't tell it from YAGNI / over-engineering without context on usage or the roadmap [2].</p>
  </div>
  <div class="panel orange">
    <div class="head c-orange"><tabler-circle-off class="icon" /> OPRO prompts never fire</div>
    <p class="small"><code>abstraction</code> and <code>observability</code> are the two OPRO-tuned prompts [6]. Both fired in <b>0 of 30</b> calls; abstraction missed all 3 labelled positives.</p>
    <p class="small mt-2 c-text2">OPRO's reward was self-consistency only, and "always no" is perfectly consistent.</p>
  </div>
  <div class="panel orange">
    <div class="head c-orange"><tabler-flame class="icon" /> <code>api-stability</code> over-fires</div>
    <p class="small">The <b>untuned</b> prompt: fires on 5 of 6 items, all false positives. A loose bullet list with no decision rule.</p>
  </div>
</div>

<div class="key mt-5"><b>The CACM payoff test:</b> "a design decision yields technical credit upon its utilization" [2]. A one-implementation strategy has the structure but no payoff, and nothing in the prompts asks whether the variation point is used. This is the YAGNI case, and why H5 fails.</div>

<p class="src">Exploratory: credit twins draw more firing categories than look-alikes (2.5 vs 1.0 per analysis); a count threshold might separate them.</p>

---

# Key finding: the reported category is overwritten

When a call fires, the model often names a **different** category. `analyseForTC` replaces it with the one asked.

<div class="grid grid-cols-5 gap-5 mt-3 items-center">
  <div class="col-span-3 compact">

| Heuristic asked | Fired | Category the model reported |
| --- | --- | --- |
| `api-stability` | 48 | <span class="c-purple">abstraction 38</span>, configurability 10 |
| `automation` | 10 | configurability 10 |
| `reusability` | 10 | configurability 10 |
| `configurability` | 10 | configurability 10 |
| `modularity` | 30 | modularity 30 |

<p class="src">Both runs combined. 62.3% of fired answers name another category (reference run).</p>

  </div>
  <div class="col-span-2">
    <div class="panel green">
      <div class="head c-green small">Score by the reported category</div>
      <Bar label="F1" :value="67" :from="26.7" color="var(--green)" />
      <Bar label="Accuracy" :value="91.3" :from="76.1" color="var(--green)" />
      <p class="small mt-1">Accuracy now beats always-no (89.1%) in both runs.</p>
    </div>
    <div class="badge c-orange mt-3">exploratory · chosen after seeing the data</div>
  </div>
</div>

---
class: wide
---

# In VS Code: previews on a real interface

<div class="grid grid-cols-5 gap-4 items-start">
  <figure class="fig col-span-3">
    <img src="/images/tc-regression-05-interface-preview.png" class="shot" style="max-height: 400px" />
    <span class="src">Shapes.java: 2 previews above <code>interface Shape</code>, each with Accept / Dismiss</span>
  </figure>
  <div class="col-span-2 flex flex-col gap-4">
    <figure class="fig">
      <img src="/images/tc-regression-13-adr-link.png" class="shot" />
      <span class="src">ADR linking: <code>adr = "ADR-0001"</code></span>
    </figure>
    <figure class="fig">
      <img src="/images/tc-regression-15-no-api-key.png" class="shot" />
      <span class="src">No key: an actionable message with a Set API Key button</span>
    </figure>
  </div>
</div>

---

# In VS Code: records and real-world code

<div class="grid grid-cols-2 gap-5 items-start">
  <figure class="fig">
    <img src="/images/tc-regression-04b-record.png" class="shot" style="max-height: 360px" />
    <span class="src">The <code>Money</code> record gets 3 previews; records were rejected before Sprint 1</span>
  </figure>
  <figure class="fig">
    <img src="/images/tc-real-vscode-weather-observer.png" class="shot" style="max-height: 360px" />
    <span class="src">iluwatar Observer sample: <code>modularity</code> and <code>abstraction</code> credit on <code>Weather</code> (earlier build, before the syntax fix)</span>
  </figure>
</div>

---
layout: divider
part: 5
minutes: 3 min
---

# Limitations and Sprint 2

What the numbers can't tell us yet, and what we do next

---

# Limitations

<div class="grid grid-cols-2 gap-4 mt-3">
  <div class="panel dim"><div class="head"><tabler-users class="icon c-red" /> One labeller</div><p class="small">The study author built the items and wrote every label. No agreement figure yet.</p></div>
  <div class="panel dim"><div class="head"><tabler-chart-dots-3 class="icon c-red" /> Small sample</div><p class="small">6 synthetic items, 46 scored pairs. Results are indicative, not estimates.</p></div>
  <div class="panel dim"><div class="head"><tabler-eye-question class="icon c-red" /> Unobservable recall</div><p class="small">5 categories have no positive item; only their false positives can be seen.</p></div>
  <div class="panel dim"><div class="head"><tabler-flask class="icon c-red" /> Exploratory re-scoring</div><p class="small">The 67% F1 by reported category was chosen after seeing the data.</p></div>
</div>

<div class="key mt-5">Also: temperature 0 only, synthetic code, and the taxonomy may change upstream (PR #145), where GoF patterns are mechanisms, not credit; the APSEC draft describes 9 benefit categories, the code has 8.</div>

---

# Sprint 2 next steps

<div class="grid grid-cols-4 gap-3 mt-2 next">
  <div class="panel orange">
    <div class="head c-orange"><tabler-target class="icon" /> 1 · Fix OPRO</div>
    <p class="small">Reward agreement with labels (pair F1 on a held-out split); keep self-consistency as a constraint only.</p>
  </div>
  <div class="panel orange">
    <div class="head c-orange"><tabler-coin class="icon" /> 2 · Payoff test</div>
    <p class="small">Each prompt names the change made cheaper and evidence it is anticipated. New outcome: "structure present, credit unrealised" [2].</p>
  </div>
  <div class="panel green">
    <div class="head c-green"><tabler-arrows-split class="icon" /> 3 · Categories</div>
    <p class="small">Keep the model's reported category, or ask once for all. Ship the 9th, <code>knowledge-preservation</code> [5, 6].</p>
  </div>
  <div class="panel purple">
    <div class="head c-purple"><tabler-file-description class="icon" /> 4 · TC-ADR schema</div>
    <p class="small">Add <code>confidence</code> and <code>status</code> (<code>anticipated</code>), keep the rationale, split <code>evidence</code> from realisation <code>signals</code> [5].</p>
  </div>
  <div class="panel blue">
    <div class="head c-blue"><tabler-users-group class="icon" /> 5 · Expert benchmark</div>
    <p class="small">Grow the pilot into the paper's benchmark [6]: 2nd and 3rd blind labellers, plus OSS items labelled from history (credit = later commits used it).</p>
  </div>
  <div class="panel blue">
    <div class="head c-blue"><tabler-file-plus class="icon" /> 6 · ADR creation</div>
    <p class="small">"Create TC-ADR from annotation", pre-filled <code>tc-*</code> fields, and a link back to the code [5, 6].</p>
  </div>
  <div class="panel dim">
    <div class="head"><tabler-git-pull-request class="icon c-orange" /> 7 · GoF rerun</div>
    <p class="small">Rerun on <a href="https://github.com/cielbellerose/TechnicalCredit/pull/145">#145</a>. Caveat: patterns are mechanisms, not credit; the paper describes 9 benefit categories.</p>
  </div>
  <div class="panel dim">
    <div class="head"><tabler-temperature class="icon c-purple" /> 8 · Temperature 1</div>
    <p class="small">Optional <code>TC_TEMPERATURE=1</code> run, about $1.70; pre-register reported-category scoring.</p>
  </div>
</div>

<p class="src">Pilot spend so far: $3.40 of an $11 budget (smoke test + two full runs).</p>

---

# References

<div class="refs mt-2">

1. **Technical Credit: Concept & Evidence.** technical.credit. [technical.credit/concept.html](https://technical.credit/concept.html)
2. I. Gorton, A. Bucaioni, P. Pelliccione. **Technical Credit.** *Communications of the ACM* 68(2), 2025. [cacm.acm.org/opinion/technical-credit](https://cacm.acm.org/opinion/technical-credit/)
3. A. Bucaioni, I. Gorton, P. Pelliccione. **Technical Credit: Industry Views on Benefits and Barriers.** ICSE 2026 SEIP, Distinguished Paper Award. [conf.researchr.org](https://conf.researchr.org/details/icse-2026/icse-2026-software-engineering-in-practice/12/Technical-Credit-Industry-Views-on-Benefits-and-Barriers)
4. I. Gorton, A. Bucaioni, P. Pelliccione. **A Research Agenda for Technical Credit: Giving Software Quality a Language.** Medium, May 2026. [medium.com/@i.gorton](https://medium.com/@i.gorton/a-research-agenda-for-technical-credit-giving-software-quality-a-language-e9ad62a0cbf9)
5. I. Gorton. **A VSCode Plugin for Capturing Technical Credit in Architecture Decision Records** (TC-ADR Manager). LinkedIn, Jul 2026. [linkedin.com/pulse](https://www.linkedin.com/pulse/vscode-plugin-capturing-technical-credit-architecture-ian-gorton-ltapf/)
6. **Towards Automatic Identification of Technical Credit.** APSEC 2026 draft (unpublished; describes this extension).

</div>

<p class="src mt-4">Project data: SASUKE40/technicalcredit, study/README.md (pre-registration) and study/sprint-1-results.md (results).</p>

---
layout: center
class: text-center
---

# Questions?

<p class="c-text2">Results: <code>study/sprint-1-results.md</code> · Pre-registration: <code>study/README.md</code></p>
<p class="small c-muted mt-2">SASUKE40/technicalcredit</p>
