(() => {
  const KEY = "DualSubs";
  const GROUPS = ["Universal", "Composite", "Translate", "API"];

  const raw = $persistentStore.read(KEY);
  let data = {};

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.log(
        "👻 AC forever: invalid DualSubs storage, skipped"
      );
      $done({});
      return;
    }
  }

  let changed = false;

  for (const name of GROUPS) {
    if (!data[name] || typeof data[name] !== "object") {
      data[name] = {};
    }

    let settings = data[name].Settings;

    if (typeof settings === "string") {
      try {
        settings = JSON.parse(settings || "{}");
      } catch (e) {
        settings = {};
      }
    }

    if (
      !settings ||
      typeof settings !== "object" ||
      Array.isArray(settings)
    ) {
      settings = {};
    }

    if (settings.Position !== "Forward") {
      settings.Position = "Forward";
      changed = true;
    }

    data[name].Settings = settings;
  }

  if (changed) {
    const ok = $persistentStore.write(
      JSON.stringify(data),
      KEY
    );

    console.log(
      "👻 AC forever: Position enforced -> Forward:",
      ok
    );
  } else {
    console.log(
      "👻 AC forever: Position already Forward"
    );
  }

  $done({});
})();
