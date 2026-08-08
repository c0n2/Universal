let data = {};

try {
  data = JSON.parse($persistentStore.read("DualSubs") || "{}");
} catch (e) {
  console.log("👻 AC forever: failed to parse DualSubs storage:", e);
  data = {};
}

console.log(
  "👻 AC forever: DualSubs storage before patch:",
  JSON.stringify(data)
);

for (const name of ["Universal", "Composite", "API"]) {
  data[name] ||= {};

  if (typeof data[name].Settings === "string") {
    try {
      data[name].Settings = JSON.parse(data[name].Settings || "{}");
    } catch (e) {
      data[name].Settings = {};
    }
  }

  data[name].Settings ||= {};
  data[name].Settings.Position = "Reverse";
}

const ok = $persistentStore.write(
  JSON.stringify(data),
  "DualSubs"
);

console.log(
  "👻 AC forever: DualSubs storage after patch:",
  JSON.stringify(data)
);

console.log(
  "👻 AC forever: Position -> Reverse:",
  ok
);

$notification.post(
  "👻 AC forever",
  "Loon subtitle position",
  ok
    ? "Position 已写入 Reverse"
    : "写入失败，请查看日志"
);

$done();
