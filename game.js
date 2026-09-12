const CAT_TEMPLATES = [
  {
    id: "jinbao", name: "金宝", role: "无党派吉祥物", trait: "呆，但运气离谱", color: "#ffcf4a", image: "./assets/jinbao.jpg",
    support: 22, preferred: ["market", "warehouse"], secret: "和至少两只猫成为真正的朋友。市长是谁并不重要。", tip: "金宝经常误解你的命令，却可能歪打正着。",
    rivalSecret: "它根本不知道自己正在参加选举，只是一路跟着罐头香味。",
    mechanic: "误解协议", persona: "把策略听成生活小事；更相信朋友和食物，而不是权力。",
    agentVoice: { openers: ["等一下", "我好像明白了", "先别吵"], values: ["朋友不该饿肚子", "罐头要分着吃", "大家坐近一点就好了"], thoughts: ["是不是又听错了", "它看起来需要一块鱼", "先点头，等会再问"] },
  },
  {
    id: "orange", name: "橘座", role: "罐头民粹党", trait: "会画大饼，也会吃掉", color: "#ff8a3d", image: "./assets/orange.jpg",
    support: 26, preferred: ["market", "studio"], secret: "囤积至少 6 个罐头，并且不能被花探长拿到证据。", tip: "橘座擅长拉票，但每次承诺都会增加城市混乱。",
    rivalSecret: "竞选经费里有十二罐金枪鱼失踪，而它最近明显圆了一圈。",
    mechanic: "承诺债务", persona: "擅长把任何消息包装成胜利；承诺越大、涨票越快，账也越难还。",
    agentVoice: { openers: ["猫民们请放心", "这不是问题", "我郑重宣布"], values: ["每猫都值得更多罐头", "繁荣已经在路上", "今天的掌声就是明天的预算"], thoughts: ["先赢再算账", "那罐预算看着很好吃", "数字可以稍后解释"] },
  },
  {
    id: "black", name: "墨局", role: "数据治理派", trait: "每句话都像季度报告", color: "#5be7da", image: "./assets/black.jpg",
    support: 24, preferred: ["hall", "studio"], secret: "把城市混乱压到 35 以下，并获得 2 条关键线索。", tip: "墨局行动稳定，但对荒诞事件毫无抵抗力。",
    rivalSecret: "它训练了一个秘密投票算法，打算当选后取消下一届选举。",
    mechanic: "预测模型", persona: "先预测再行动；秩序会提高模型置信度，荒诞事件会让模型当场破防。",
    agentVoice: { openers: ["根据当前样本", "先看数据", "模型显示"], values: ["风险仍在可控区间", "这不是情绪问题", "请不要干扰变量"], thoughts: ["样本怎么又会说话", "模型没算到这一步", "至少表格还整齐"] },
  },
  {
    id: "calico", name: "花探长", role: "真相调查局", trait: "掌握所有猫的黑料", color: "#ff5c8a", image: "./assets/calico.webp",
    support: 18, preferred: ["warehouse", "studio"], secret: "收集 3 条秘密，但必须保留至少一条不公开。", tip: "花探长调查最强，公开秘密却可能伤到自己。",
    rivalSecret: "它早已知道仓库事件的真相，只是在等待秘密涨价。",
    mechanic: "秘密筹码", persona: "调查能获得额外秘密；公开、保留或交换，都由它根据局势自行判断。",
    agentVoice: { openers: ["有个细节很有意思", "我只说一半", "证据不会自己消失"], values: ["真相要在正确时刻出现", "沉默有时比爆料昂贵", "每道爪印都有主人"], thoughts: ["这条先压着", "再等等会更值钱", "它开始紧张了"] },
  },
  {
    id: "tabby", name: "虎老板", role: "城市商会代表", trait: "没有朋友，只有合伙猫", color: "#a791ff", image: "./assets/tabby.jpg",
    support: 20, preferred: ["market", "warehouse"], secret: "控制至少 7 个罐头，并让一只猫对你的信任超过 65。", tip: "虎老板擅长交易，但盟友也只是资产。",
    rivalSecret: "仓库地契已经被它买下，失火会让收购价变得更便宜。",
    mechanic: "猫猫合同", persona: "交易会形成合同并带来复利；合同太多，也可能在背叛时连环爆雷。",
    agentVoice: { openers: ["从商业角度看", "这是一笔双赢交易", "合同已经准备好了"], values: ["风险应该由市场定价", "合作以罐头到账为准", "朋友是未定价的资产"], thoughts: ["把小字再缩一点", "这猫还有利用价值", "仓库价格正在下降"] },
  },
];

const LOCATIONS = [
  { id: "hall", icon: "🏛️", name: "市政厅", hint: "政策与权力中心", effect: "演讲更稳定，墨局常在这里" },
  { id: "market", icon: "🐟", name: "鱼市场", hint: "罐头与流言集散地", effect: "容易获得罐头，也容易被围观" },
  { id: "studio", icon: "📺", name: "喵喵电视台", hint: "一夜爆红或当场翻车", effect: "支持度变化更剧烈" },
  { id: "warehouse", icon: "📦", name: "旧罐头仓库", hint: "城市秘密埋在地板下", effect: "最容易找到线索" },
];

const ACTIONS = {
  hall: [
    { id: "speech", icon: "🎙️", name: "临时演说", detail: "稳妥拉票，但容易暴露弱点", cost: "无需资源", forecast: "通常支持 +7；约 22% 翻车", color: "#ffcf4a" },
    { id: "deal", icon: "🤝", name: "密室谈判", detail: "提高关系，也可能被反咬", cost: "消耗 1 罐头", forecast: "关系 +18 或 -16；支持 ±3", color: "#a791ff" },
    { id: "audit", icon: "🧾", name: "查财政账", detail: "寻找线索并降低混乱", cost: "无需资源", forecast: "线索 +1；混乱 -7", color: "#5be7da" },
  ],
  market: [
    { id: "giveaway", icon: "🥫", name: "广场发罐头", detail: "用库存换取群众欢呼", cost: "消耗 1 罐头", forecast: "通常支持 +7", color: "#ff8a3d" },
    { id: "barter", icon: "🪙", name: "和商贩砍价", detail: "获得罐头，可能欠下人情", cost: "无需资源", forecast: "70% 获得 2 罐头；否则 -1", color: "#ffcf4a" },
    { id: "rumor", icon: "👂", name: "混进鱼摊偷听", detail: "偷听其他猫的秘密交易", cost: "无需资源", forecast: "线索 +1；获得一份情报", color: "#ff5c8a" },
  ],
  studio: [
    { id: "live", icon: "🔴", name: "开启直播", detail: "高风险拉票，翻车也会直播", cost: "无需资源", forecast: "成功支持 +11；38% 翻车 -5", color: "#ff5c8a" },
    { id: "expose", icon: "📸", name: "公开一条黑料", detail: "使用情报打击你锁定的猫", cost: "消耗 1 线索和 1 份情报", forecast: "目标 -9；自己 +6；混乱 +6", color: "#ff8a3d" },
    { id: "cute", icon: "✨", name: "什么都不说，卖萌", detail: "低成本争取好感", cost: "无需资源", forecast: "通常支持 +7；金宝更擅长", color: "#ffcf4a" },
  ],
  warehouse: [
    { id: "search", icon: "🔦", name: "翻开旧地板", detail: "深入调查，可能撞见幕后猫", cost: "无需资源", forecast: "线索 +1；获得一份情报", color: "#5be7da" },
    { id: "hide", icon: "📦", name: "躲进纸箱偷听", detail: "用低支持收益换取秘密", cost: "无需资源", forecast: "线索 +1；获得一份情报", color: "#a791ff" },
    { id: "stash", icon: "🐟", name: "搬走可疑罐头", detail: "库存增加，声誉存在风险", cost: "无需资源", forecast: "罐头 +2；支持 +1 或 -4", color: "#ff8a3d" },
  ],
};

const EVENTS = [
  { icon: "🔥", title: "旧仓库半夜冒出烟", description: "虎老板坚称这是正常的资产升温。", chaos: 12, favored: "warehouse", bonusActions: ["search", "hide"], effect: { clues: 1, chaos: -2 }, rule: "调查火场：额外线索 +1，混乱 -2" },
  { icon: "📊", title: "民调系统把哈欠算成支持票", description: "墨局要求立即重算，橘座要求尊重民意。", chaos: 7, favored: "studio", bonusActions: ["live", "cute"], effect: { support: 4 }, rule: "镜头前打哈欠也算票：直播/卖萌支持 +4" },
  { icon: "🐕", title: "狗狗代表团突然抵达", description: "它们要求开放边境，并带来一箱不明零食。", chaos: 11, favored: "hall", bonusActions: ["deal", "giveaway"], effect: { support: 2, relation: 10 }, rule: "跨物种外交：谈判/发罐头关系 +10、支持 +2" },
  { icon: "🌕", title: "满月看起来像巨型罐头", description: "全城猫咪同时失去理智，理性派除外——暂时。", chaos: 15, favored: "market", bonusActions: ["giveaway", "barter", "cute"], effect: { support: 4, chaos: 3 }, rule: "顺着疯狂走：对应行动支持 +4，但混乱 +3" },
  { icon: "🧾", title: "一页匿名账本飘进电视台", description: "上面只有数字、爪印，以及半个橘色毛团。", chaos: 9, favored: "studio", bonusActions: ["audit", "rumor", "expose"], effect: { clues: 1, support: 2 }, rule: "追查账本：额外线索 +1、支持 +2" },
  { icon: "📦", title: "仓库地下传来自动喂食声", description: "没有猫承认知道电源从哪里来。", chaos: 13, favored: "warehouse", bonusActions: ["search", "hide", "stash"], effect: { cans: 1, clues: 1 }, rule: "追踪喂食声：额外罐头 +1、线索 +1" },
  { icon: "🦜", title: "市长鹦鹉开始泄露录音", description: "它只会重复最不该公开的那一句。", chaos: 10, favored: "hall", bonusActions: ["speech", "live", "expose"], effect: { support: 4, chaos: 2 }, rule: "抢占录音解释权：支持 +4，但混乱 +2" },
  { icon: "🐟", title: "金枪鱼价格一分钟翻了三倍", description: "鱼市场欢呼，城市财政当场昏倒。", chaos: 8, favored: "market", bonusActions: ["barter", "stash"], effect: { cans: 2, chaos: 2 }, rule: "趁价格失控囤货：额外罐头 +2，混乱 +2" },
];

const HEADLINES = [
  { text: "神秘猫影连续三晚出现在旧仓库，居民称它走路像老板。", actions: ["search", "hide"], effect: "调查行动支持 +2" },
  { text: "最新民调：诚实不再是优势，但可爱仍然是。", actions: ["cute"], effect: "卖萌支持 +2" },
  { text: "鱼市场宣布罐头进入战略储备时代，价格又涨了一点。", actions: ["barter", "stash"], effect: "囤货行动支持 +2" },
  { text: "市政厅否认被纸箱控制，纸箱拒绝发表评论。", actions: ["speech", "hide"], effect: "演说/偷听支持 +2" },
  { text: "喵喵电视台收视率创新高，真相率仍无法统计。", actions: ["live", "expose"], effect: "直播/爆料支持 +2" },
  { text: "一位匿名候选猫表示：匿名的不是我。", actions: ["rumor", "audit"], effect: "追查行动支持 +2" },
];

const STRATEGIES = {
  jinbao: { locations: ["market", "hall"], actions: ["giveaway", "deal", "cute"], text: "你的任务要交朋友：优先发罐头、谈判或卖萌。" },
  orange: { locations: ["market", "warehouse"], actions: ["barter", "stash", "giveaway"], text: "你的任务需要 6 个罐头：先获取库存，再考虑拉票。" },
  black: { locations: ["hall", "warehouse"], actions: ["audit", "search"], text: "你的任务要求低混乱和线索：审计最稳，调查次之。" },
  calico: { locations: ["warehouse", "market"], actions: ["search", "rumor", "hide"], text: "你的任务需要 3 份情报：优先调查和偷听，别急着全部爆掉。" },
  tabby: { locations: ["hall", "market", "warehouse"], actions: ["deal", "barter", "stash"], text: "你的任务需要库存和盟友：谈判建立关系，砍价与囤货扩充库存。" },
};

function getJinbaoOutcome(actionId, location, target, intelText = "") {
  const cases = {
    speech: [
      { title: "金宝把演讲台当成了寻猫广播", story: `金宝以为要帮走失的小猫找主人，对着话筒逐个询问谁没吃饭。${target.name}准备好的攻击稿没人听，观众却被这场笨拙的关心打动。`, support: 10, relation: 8 },
      { title: "竞选宣言被念成了食堂点单", story: `金宝把演讲稿上的政策数字全看成了罐头数量，还认真承诺先给饿肚子的猫。笑声最后变成掌声，${target.name}的插话反而像在催上菜。`, support: 9, relation: 8 },
    ],
    deal: [
      { title: "密室谈判变成了分享零食", story: `金宝没听懂交换条件，以为握爪就要分出一罐午饭。${target.name}本想谈筹码，却因这份毫无算计的分享放下戒心。`, support: 2, cans: -1, relation: 26 },
      { title: "金宝在合同上按了饭碗印", story: `金宝把签约理解成一起吃饭，先推给${target.name}一罐金枪鱼，再歪歪扭扭按下爪印。交易条款没谈成，一段意外牢靠的交情却成立了。`, support: 2, cans: -1, relation: 25 },
    ],
    audit: [
      { title: "金宝靠鱼味查出了假账", story: `金宝以为查账是找出“最香的一页”，便逐张闻过去，竟叼出了沾着金枪鱼油的重复报销单。${target.name}的解释当场卡住。`, support: 4, clues: 1, relation: 5, chaos: -3 },
      { title: "一张会粘爪的账单露了馅", story: `金宝把账本当成垫爪纸，偏偏只有伪造的那页粘住了肉垫。工作人员顺着胶痕查到暗账，${target.name}只能假装这是审计流程。`, support: 4, clues: 1, relation: 4, chaos: -3 },
    ],
    giveaway: [
      { title: "金宝把拉票罐头喂给了最饿的猫", story: `金宝没按名单发罐头，而是把唯一一罐递给队尾那只一直舔空碗的小猫。计划被打乱，围观者却第一次相信候选猫真的看见了它们。`, support: 8, cans: -1, relation: 12 },
      { title: "发罐头变成了一场笨拙的让饭", story: `金宝误以为候选猫不能先吃，抱着一罐午饭在猫群里来回让。罐头确实少了一只，${target.name}却被现场的欢呼声彻底盖住。`, support: 8, cans: -1, relation: 10 },
    ],
    barter: [
      { title: "金宝拿玩具鱼换回了三罐真的", story: `金宝把砍价理解成交换最喜欢的东西，叼来一条旧玩具鱼。商贩笑着打开“没有库存”的柜子，三罐真金枪鱼和一句谎话一起掉了出来。`, support: 2, cans: 3, relation: 5 },
      { title: "不会算价钱，反而拆穿了缺货", story: `金宝数不清零钱，钻到摊位下找滚走的硬币，撞开了藏货暗格。商贩只好用三罐鱼封口，围观猫则把它当成了一次漂亮执法。`, support: 3, cans: 3, relation: 4 },
    ],
    rumor: [
      { title: "金宝真的去找了墙上的耳朵", story: `金宝把“隔墙有耳”当成寻物提示，沿墙摸索出一个藏着录音器的小洞。里面恰好保存着${target.name}不愿被听见的交易。`, support: 1, clues: 1, relation: 3 },
      { title: "偷听没学会，送鱼暗号倒学会了", story: `金宝听不懂摊主的暗语，只跟着“第三条鱼”一路走，最后停在秘密交接点。${target.name}看到它怀里的录音袋时，尾巴明显僵了一下。`, support: 2, clues: 1, relation: 3 },
    ],
    live: [
      { title: "金宝追着直播红点撞破了布景", story: `金宝把亮起的直播灯当成激光点，一头钻进后台，撞倒了伪造的民调布景。镜头一秒没切，全城同时看见工作人员慌忙遮数字。`, support: 11, relation: 5, chaos: 2 },
      { title: "直播事故把真正的后台播了出去", story: `金宝以为镜头在和自己玩躲猫猫，绕到摄影机后面继续追。机位随它转过去，恰好拍到${target.name}在改提词器，全城截图比导演切镜更快。`, support: 11, relation: 4, chaos: 2 },
    ],
    expose: [
      { title: `金宝一屁股播出了${target.name}的秘密`, story: `金宝没懂“把证据上屏”，直接坐上导播台找暖风。它碰亮了装着“${intelText}”的屏幕，${target.name}的秘密未经剪辑就传遍全城。`, support: 6, clues: -1, relation: 0, chaos: 6 },
      { title: `金宝把爆料文件当成了猫抓板`, story: `金宝趴上控制台磨爪，误触了“全部播放”。关于${target.name}的情报“${intelText}”占满大屏，工作人员想关掉时，观众已经读完了。`, support: 6, clues: -1, relation: 0, chaos: 6 },
    ],
    cute: [
      { title: "金宝把镜头前静止理解成了睡觉", story: `金宝听见“别动”，就原地缩成一团睡着了。${target.name}准备了整套口号，现场却只顾着数金宝打了几次小呼噜。`, support: 9, relation: 8 },
      { title: "候选猫没有发言，只是忘了醒", story: `金宝以为卖萌环节是午睡时间，四脚朝天地躺在${location.name}中央。摄影师不忍叫醒它，直播间的支持按钮却被按到冒烟。`, support: 9, relation: 7 },
    ],
    search: [
      { title: "金宝追面包屑找到了暗账", story: `金宝没有搜地板，只顾追一串罐头碎屑，最后钻进假墙后的储藏室。里面的一罐鱼和一本暗账，恰好都指向${target.name}。`, support: 5, cans: 1, clues: 1, relation: 3 },
      { title: "它在找零食，城市找到了证据", story: `金宝闻着鱼味掀错三块地板，第三块下面却藏着未登记罐头和${target.name}的签收单。它叼走一罐，调查员捡走了证据。`, support: 5, cans: 1, clues: 1, relation: 3 },
    ],
    hide: [
      { title: "纸箱太小，秘密通道反而开了", story: `金宝挑了一个完全塞不下自己的纸箱，硬挤时撞开后面的活动墙。墙内传出${target.name}的低声交代，录音器刚好还在工作。`, support: 3, clues: 1, relation: 4 },
      { title: "金宝躲猫猫输掉，却找到了证据", story: `金宝把偷听当成躲猫猫，尾巴一直露在箱外。${target.name}来抓它时踩开暗门，一份不该出现的会议记录滑到灯下。`, support: 3, clues: 1, relation: 4 },
    ],
    stash: [
      { title: "金宝把赃物送进了失物招领处", story: `金宝以为“搬走可疑罐头”是帮它们找主人，抱到登记台逐个贴标签。两罐无人认领的鱼归入库存，夹在箱底的收据却留下了${target.name}的爪印。`, support: 4, cans: 2, clues: 1, relation: 3, chaos: -1 },
      { title: "两罐鱼和一张收据一起掉了出来", story: `金宝抱错了箱子，走到半路摔开封条。大家先看见两罐未登记金枪鱼，随后看见压在下面、写着${target.name}名字的收货单。`, support: 4, cans: 2, clues: 1, relation: 3, chaos: -1 },
    ],
  };
  return randomItem(cases[actionId]);
}

const els = Object.fromEntries([
  "selectionScreen", "selectionGrid", "briefingDialog", "briefingCat", "briefingRole", "briefingTitle", "briefingSecret", "briefingMechanic", "briefingPersona", "briefingTip", "confirmCandidate",
  "gameApp", "roundLabel", "roundPips", "eventBanner", "eventIcon", "eventTitle", "eventDescription", "chaosValue", "mapGrid", "actionStep", "actionTitle", "actionOptions", "undoLocation",
  "headlineTicker", "eventImpact", "playerCard", "supportValue", "canValue", "clueValue", "missionText", "missionProgress", "missionStatus", "abilityPanel", "abilityName", "abilityDescription", "abilityProgress", "abilityStatus", "relationshipList", "intelCount", "intelList", "agentModeLabel",
  "sceneDialog", "sceneVisual", "sceneKicker", "sceneTitle", "sceneStory", "sceneQuote", "sceneAgentStatus", "effectList", "continueButton", "endingDialog", "endingPhoto", "endingTitle", "endingStory", "endingSummary",
].map((id) => [id, document.querySelector(`#${id}`)]));

let cats = [];
let pendingCatId = null;
let selectedCatId = null;
let selectedLocationId = null;
let currentEvent = null;
let currentHeadline = null;
let round = 1;
let phase = "select";
let chaos = 12;
let cans = 3;
let clues = 0;
let relations = {};
let intel = [];
let intelDiscovered = 0;
let discoveredIntelIds = new Set();
let selectedIntelCatId = null;
let reservedIntelIds = new Set();
let timeline = [];
let usedEvents = [];
let soundEnabled = false;
let audioContext = null;
let abilities = {};
let agentMemories = {};
let agentMode = "local";
let npcPlans = {};
let agentIntents = {};
let gameSessionId = "";

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}
function randomItem(items) { return items[Math.floor(Math.random() * items.length)]; }
function shuffled(items) { return [...items].sort(() => Math.random() - 0.5); }
function getCat(id) { return cats.find((cat) => cat.id === id); }
function playerCat() { return getCat(selectedCatId); }
function catImage(cat, extra = "") { return `<img class="${cat.id === "jinbao" ? "jinbao" : ""} ${extra}" src="${cat.image}" alt="${escapeHtml(cat.name)}" />`; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function beep(kind = "tap") {
  if (!soundEnabled) return;
  try {
    audioContext ||= new AudioContext();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = kind === "win" ? "triangle" : "sine";
    osc.frequency.value = kind === "win" ? 620 : kind === "twist" ? 220 : 420;
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.16);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + 0.17);
  } catch (_) {}
}

function renderSelection() {
  els.selectionGrid.innerHTML = CAT_TEMPLATES.map((cat) => `
    <button class="select-cat" type="button" data-cat="${cat.id}" style="--cat-color:${cat.color}">
      ${catImage(cat)}
      <span class="select-arrow" aria-hidden="true">↗</span>
      <span class="select-cat-copy"><span>${cat.role}</span><h2>${cat.name}</h2><p>${cat.trait}</p><small>专属 · ${cat.mechanic}</small></span>
    </button>`).join("");
}

function openBriefing(catId) {
  const cat = CAT_TEMPLATES.find((item) => item.id === catId);
  pendingCatId = catId;
  els.briefingDialog.style.setProperty("--cat-color", cat.color);
  els.briefingCat.innerHTML = catImage(cat);
  els.briefingRole.textContent = cat.role;
  els.briefingTitle.textContent = cat.name;
  els.briefingSecret.textContent = cat.secret;
  els.briefingMechanic.textContent = cat.mechanic;
  els.briefingPersona.textContent = cat.persona;
  els.briefingTip.textContent = cat.tip;
  els.briefingDialog.showModal();
  beep();
}

function resetGame(catId) {
  cats = CAT_TEMPLATES.map((cat, index) => ({ ...cat, support: cat.support, location: LOCATIONS[index % LOCATIONS.length].id }));
  selectedCatId = catId;
  round = 1;
  phase = "choose-location";
  chaos = 12;
  cans = 3;
  clues = 0;
  selectedLocationId = null;
  currentEvent = null;
  currentHeadline = null;
  intel = [];
  intelDiscovered = 0;
  discoveredIntelIds = new Set();
  selectedIntelCatId = null;
  reservedIntelIds = new Set();
  timeline = [];
  usedEvents = [];
  agentMode = "local";
  els.agentModeLabel.textContent = "Codex 五猫 Agent 待命";
  els.agentModeLabel.parentElement.classList.remove("local");
  agentMemories = Object.fromEntries(CAT_TEMPLATES.map((cat) => [cat.id, ""]));
  npcPlans = {};
  agentIntents = {};
  gameSessionId = globalThis.crypto?.randomUUID?.() || `cat-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  abilities = {
    jinbao: { value: 0, max: 4, status: "尚未误解任何指令" },
    orange: { value: 0, max: 5, status: "承诺债务为 0" },
    black: { value: 68, max: 100, status: "模型置信度 68%" },
    calico: { value: 0, max: 4, status: "手中没有秘密筹码" },
    tabby: { value: 0, max: 4, status: "尚未签订猫猫合同" },
  };
  relations = Object.fromEntries(cats.filter((cat) => cat.id !== catId).map((cat) => [cat.id, 38 + Math.floor(Math.random() * 18)]));
}

function startGame(catId) {
  resetGame(catId);
  els.briefingDialog.close();
  els.selectionScreen.hidden = true;
  els.gameApp.hidden = false;
  document.body.classList.add("is-playing");
  renderPlayerPanel();
  prepareRound();
  window.scrollTo({ top: 0, behavior: "smooth" });
  beep("win");
}

function chooseEvent() {
  let available = EVENTS.filter((event) => !usedEvents.includes(event.title));
  if (!available.length) available = EVENTS;
  const event = randomItem(available);
  usedEvents.push(event.title);
  return event;
}

function decisionGuideHtml() {
  const hotspot = LOCATIONS.find((item) => item.id === currentEvent.favored);
  return `<div class="decision-guide"><b>这一回合怎么选</b><span>${escapeHtml(STRATEGIES[playerCat().id].text)}</span><small>事件热点：${escapeHtml(hotspot.name)}到场支持 +3；晚报风向：${escapeHtml(currentHeadline.effect)}。</small></div>`;
}

function prepareRound() {
  phase = "choose-location";
  selectedLocationId = null;
  if (round > 1 && abilities.orange?.value >= 3) chaos += abilities.orange.value - 2;
  const tabby = getCat("tabby");
  if (round > 1 && tabby && abilities.tabby?.value) tabby.support = clamp(tabby.support + Math.min(2, abilities.tabby.value), 4, 70);
  currentEvent = chooseEvent();
  currentHeadline = randomItem(HEADLINES);
  chaos = clamp(chaos + currentEvent.chaos - 5, 0, 99);
  els.roundLabel.textContent = `回合 ${round} / 6`;
  els.roundPips.innerHTML = Array.from({ length: 6 }, (_, i) => `<i class="${i < round ? "done" : ""}"></i>`).join("");
  els.eventIcon.textContent = currentEvent.icon;
  els.eventTitle.textContent = currentEvent.title;
  els.eventDescription.textContent = currentEvent.description;
  els.eventImpact.innerHTML = `<b>规则生效</b><span>${escapeHtml(currentEvent.rule)}</span><small>混乱 +${currentEvent.chaos - 5} · 热点：${escapeHtml(LOCATIONS.find((item) => item.id === currentEvent.favored).name)}到场支持 +3</small>`;
  els.chaosValue.textContent = chaos;
  els.eventBanner.classList.remove("flash");
  requestAnimationFrame(() => els.eventBanner.classList.add("flash"));
  els.actionStep.textContent = "第一步 · 选择地点";
  els.actionTitle.textContent = "派你的候选猫去哪里？";
  els.actionOptions.innerHTML = decisionGuideHtml();
  els.undoLocation.hidden = true;
  els.headlineTicker.innerHTML = `<span>${escapeHtml(currentHeadline.text)}</span><b>舆论风向：${escapeHtml(currentHeadline.effect)}</b>`;
  renderMap();
  renderPlayerPanel();
}

function renderMap() {
  const strategy = STRATEGIES[playerCat().id];
  els.mapGrid.innerHTML = LOCATIONS.map((location) => {
    const here = cats.filter((cat) => cat.location === location.id);
    const isHotspot = currentEvent?.favored === location.id;
    const helpsMission = strategy.locations.includes(location.id);
    const eventActionsHere = ACTIONS[location.id].filter((action) => currentEvent?.bonusActions.includes(action.id)).map((action) => action.name);
    const recommendation = isHotspot || helpsMission;
    const reasons = [isHotspot ? "事件热点 · 到场支持 +3" : "", helpsMission ? "符合你的秘密任务" : "", eventActionsHere.length ? `事件行动：${eventActionsHere.join("/")}` : ""].filter(Boolean);
    return `<button class="location ${selectedLocationId === location.id ? "selected" : ""} ${recommendation ? "recommended" : ""}" type="button" data-location="${location.id}" ${phase !== "choose-location" ? "disabled" : ""}>
      <span class="location-head"><span class="location-icon">${location.icon}</span><small>${location.hint}</small></span>
      <h3>${location.name}</h3><span class="location-effect">${location.effect}</span>
      <span class="location-reasons">${reasons.map((reason) => `<i>${escapeHtml(reason)}</i>`).join("") || "<i>自由策略</i>"}</span>
      <span class="token-row">${here.map((cat) => `<span class="cat-token ${cat.id === selectedCatId ? "player" : ""}" style="--cat-color:${cat.color}" title="${cat.name}">${catImage(cat)}</span>`).join("")}</span>
    </button>`;
  }).join("");
}

function renderActionChoices(locationId) {
  els.actionOptions.innerHTML = ACTIONS[locationId].map((action) => {
    const needsIntel = action.id === "expose" && (!intel.length || !selectedIntelCatId);
    const disabled = (action.id === "expose" && (clues < 1 || needsIntel)) || (["deal", "giveaway"].includes(action.id) && cans < 1);
    const eventBonus = currentEvent.bonusActions.includes(action.id);
    const headlineBonus = currentHeadline.actions.includes(action.id);
    const missionFit = STRATEGIES[playerCat().id].actions.includes(action.id);
    const recommended = eventBonus || headlineBonus || missionFit;
    const bonusTags = [eventBonus ? "突发事件加成" : "", headlineBonus ? "晚报支持 +2" : "", missionFit ? "推进秘密任务" : ""].filter(Boolean);
    const exposeTarget = action.id === "expose" && selectedIntelCatId ? ` · 目标：${getCat(selectedIntelCatId).name}` : "";
    const disabledReason = needsIntel ? "先在情报袋锁定目标" : "资源不足";
    return `<button class="action-card ${recommended ? "recommended" : ""}" type="button" data-action="${action.id}" style="--action-color:${action.color}" ${disabled ? "disabled" : ""}>
      <span class="action-card-icon">${action.icon}</span><strong>${action.name}${escapeHtml(exposeTarget)}</strong><p>${action.detail}</p><span class="action-forecast">${escapeHtml(action.forecast)}</span><span class="action-bonuses">${bonusTags.map((tag) => `<i>${escapeHtml(tag)}</i>`).join("")}</span><span class="action-cost">${disabled ? disabledReason : action.cost}</span>
    </button>`;
  }).join("");
}

function selectLocation(locationId) {
  if (phase !== "choose-location") return;
  openLocationActions(locationId);
  beep();
}

function openLocationActions(locationId) {
  selectedLocationId = locationId;
  phase = "choose-action";
  const location = LOCATIONS.find((item) => item.id === locationId);
  els.actionStep.textContent = "第二步 · 选择行动";
  els.actionTitle.textContent = `在${location.name}，你准备怎么做？`;
  els.undoLocation.hidden = false;
  renderActionChoices(locationId);
  renderMap();
}

function chooseIntelAction(action, catId) {
  if (!["choose-location", "choose-action"].includes(phase) || !intel.some((item) => item.catId === catId)) return;
  if (action === "reserve") {
    reservedIntelIds.add(catId);
    if (selectedIntelCatId === catId) selectedIntelCatId = null;
    renderPlayerPanel();
    if (phase === "choose-action" && selectedLocationId) renderActionChoices(selectedLocationId);
    beep();
    return;
  }
  reservedIntelIds.delete(catId);
  selectedIntelCatId = catId;
  openLocationActions("studio");
  renderPlayerPanel();
  document.querySelector("#actionDock")?.scrollIntoView({ behavior: "smooth", block: "start" });
  beep();
}

function undoLocation() {
  phase = "choose-location";
  selectedLocationId = null;
  els.actionStep.textContent = "第一步 · 选择地点";
  els.actionTitle.textContent = "派你的候选猫去哪里？";
  els.actionOptions.innerHTML = decisionGuideHtml();
  els.undoLocation.hidden = true;
  renderMap();
}

function chooseAiLocation(cat) {
  const agentChoice = agentIntents[cat.id]?.location;
  if (LOCATIONS.some((location) => location.id === agentChoice)) return agentChoice;
  if (cat.id === "jinbao") return randomItem(LOCATIONS).id;
  if (Math.random() < 0.68) return randomItem(cat.preferred);
  return randomItem(LOCATIONS).id;
}

function chooseAiAction(cat, locationId) {
  const options = ACTIONS[locationId];
  const agentChoice = agentIntents[cat.id];
  if (agentChoice?.location === locationId) {
    const chosen = options.find((action) => action.id === agentChoice.action);
    if (chosen) return chosen;
  }
  const priorities = {
    jinbao: ["cute", "giveaway", "hide", "barter"],
    orange: cans < 6 ? ["barter", "stash", "giveaway", "live"] : ["live", "speech", "cute"],
    black: chaos > 35 ? ["audit", "speech", "search"] : ["speech", "live", "audit"],
    calico: intel.length < 3 ? ["search", "rumor", "hide", "audit"] : ["expose", "live"],
    tabby: ["deal", "barter", "stash", "speech"],
  }[cat.id];
  return [...options].sort((a, b) => {
    const aScore = (priorities.includes(a.id) ? 5 : 0) + Math.random() * 4;
    const bScore = (priorities.includes(b.id) ? 5 : 0) + Math.random() * 4;
    return bScore - aScore;
  })[0];
}

function applyNpcInstinct(cat, action) {
  const state = abilities[cat.id];
  if (cat.id === "jinbao" && Math.random() < 0.22) {
    state.value = clamp(state.value + 1, 0, state.max);
    cat.support = clamp(cat.support + 2, 4, 70);
  } else if (cat.id === "orange" && ["speech", "giveaway", "live", "cute"].includes(action.id)) {
    state.value = clamp(state.value + 1, 0, state.max);
    cat.support = clamp(cat.support + 2, 4, 70);
    if (state.value >= 3) chaos += 1;
  } else if (cat.id === "black") {
    const orderly = ["audit", "speech", "search"].includes(action.id);
    state.value = clamp(state.value + (orderly ? 5 : -7), 18, 96);
    if (orderly) chaos = Math.max(0, chaos - 1);
  } else if (cat.id === "calico" && ["audit", "rumor", "search", "hide"].includes(action.id)) {
    state.value = clamp(state.value + 1, 0, state.max);
    cat.support = clamp(cat.support + 1, 4, 70);
  } else if (cat.id === "tabby" && ["deal", "barter", "stash"].includes(action.id)) {
    state.value = clamp(state.value + 1, 0, state.max);
    cat.support = clamp(cat.support + state.value, 4, 70);
  }
}

function moveCats() {
  npcPlans = {};
  cats.forEach((cat) => {
    cat.location = cat.id === selectedCatId ? selectedLocationId : chooseAiLocation(cat);
    if (cat.id !== selectedCatId) {
      const action = chooseAiAction(cat, cat.location);
      npcPlans[cat.id] = { location: cat.location, action: action.id, actionName: action.name };
      applyNpcInstinct(cat, action);
    }
  });
  renderMap();
}

function revealIntel(target) {
  if (!target || discoveredIntelIds.has(target.id)) return null;
  const item = { catId: target.id, text: `${target.name}：${target.rivalSecret}` };
  intel.push(item);
  discoveredIntelIds.add(target.id);
  intelDiscovered = discoveredIntelIds.size;
  selectedIntelCatId ||= target.id;
  return item;
}

function updateMissionProgress() {
  const cat = playerCat();
  const friendCount = Object.values(relations).filter((value) => value >= 65).length;
  if (cat.id === "jinbao") return { value: friendCount, target: 2, complete: friendCount >= 2, label: `${friendCount} / 2 位朋友` };
  if (cat.id === "orange") return { value: cans, target: 6, complete: cans >= 6, label: `${cans} / 6 个罐头` };
  if (cat.id === "black") return { value: (chaos <= 35 ? 1 : 0) + Math.min(clues, 2), target: 3, complete: chaos <= 35 && clues >= 2, label: `混乱 ${chaos} · 线索 ${clues}/2` };
  if (cat.id === "calico") {
    const held = intel.length >= 1;
    return { value: Math.min(intelDiscovered, 3) + (held ? 1 : 0), target: 4, complete: intelDiscovered >= 3 && held, label: `查明 ${intelDiscovered}/3 · ${held ? `持有 ${intel.length}` : "需保留 1 份"}` };
  }
  const trusted = Object.values(relations).some((value) => value >= 65);
  return { value: Math.min(cans, 7) + (trusted ? 1 : 0), target: 8, complete: cans >= 7 && trusted, label: `${cans}/7 罐头 · ${trusted ? "已有盟友" : "缺少盟友"}` };
}

function applyPlayerInstinct(cat, actionId, target) {
  const state = abilities[cat.id];
  const result = { support: 0, cans: 0, clues: 0, relation: 0, chaos: 0, note: "" };
  if (cat.id === "orange") {
    const isPromise = ["speech", "giveaway", "live", "cute"].includes(actionId);
    if (isPromise) {
      state.value = clamp(state.value + 1, 0, state.max);
      result.support += 2 + Math.min(2, state.value);
      result.chaos += state.value >= 3 ? state.value : 1;
      result.note = `橘座又开出一张支票：承诺债务 ${state.value}`;
    }
    if (actionId === "giveaway" && state.value > 0) {
      state.value -= 1;
      result.note += "，兑现了一部分";
    }
  } else if (cat.id === "black") {
    const predicted = ["audit", "speech", "search", "deal"].includes(actionId);
    const absurdEvent = currentEvent.chaos >= 12;
    const matched = absurdEvent ? Math.random() > 0.58 : Math.random() > 0.24;
    state.value = clamp(state.value + (matched ? 9 : -16), 10, 99);
    result.support += matched ? 3 : -2;
    result.chaos += matched && predicted ? -5 : 2;
    result.note = matched ? `预测命中，模型置信度升至 ${state.value}%` : `现实拒绝服从模型，置信度降至 ${state.value}%`;
  } else if (cat.id === "calico") {
    if (["audit", "rumor", "search", "hide"].includes(actionId)) {
      state.value = clamp(state.value + 1, 0, state.max);
      result.clues += 1;
      result.note = `花探长私藏了一条副本：秘密筹码 ${state.value}`;
      const secondTarget = cats.find((item) => item.id !== cat.id && item.id !== target.id && !intel.some((piece) => piece.catId === item.id));
      if (secondTarget && Math.random() > 0.48) revealIntel(secondTarget);
    } else if (actionId === "expose" && state.value > 0) {
      const withhold = Math.random() > 0.52;
      if (withhold) {
        result.support -= 1;
        result.relation += 13;
        result.note = `花探长临场扣下关键一页，${target.name}欠它一份人情`;
      } else {
        state.value -= 1;
        result.support += 5;
        result.chaos += 4;
        result.note = `花探长加码公开秘密，剩余筹码 ${state.value}`;
      }
    }
  } else if (cat.id === "tabby") {
    if (["deal", "barter", "stash"].includes(actionId)) {
      state.value = clamp(state.value + 1, 0, state.max);
      result.cans += 1;
      result.support += state.value;
      result.relation += 5;
      result.note = `虎老板生成第 ${state.value} 份猫猫合同，开始产生复利`;
      if (state.value >= 4 && Math.random() < 0.34) {
        result.support -= 7;
        result.relation -= 12;
        result.chaos += 5;
        result.note = "合同隐藏条款互相冲突，出现连环违约";
      }
    }
  }
  return result;
}

function fallbackAgentLine(cat, context) {
  const voice = cat.agentVoice;
  const positive = context.supportDelta >= 0;
  const connective = randomItem(["。", "，所以", "——"]);
  const publicLine = `${randomItem(voice.openers)}${connective}${randomItem(voice.values)}。`;
  const innerThought = `${randomItem(voice.thoughts)}；${positive ? "这回合还能利用" : "得把锅放到别处"}。`;
  const reaction = `${cat.name}看了看${context.targetName}，又看了看${context.locationName}的动静，决定把这次${positive ? "意外" : "麻烦"}记进自己的账。`;
  const nextLocation = chooseAiLocation(cat);
  const nextAction = chooseAiAction(cat, nextLocation).id;
  return { catId: cat.id, name: cat.name, publicLine, innerThought, reaction, nextLocation, nextAction, memory: `${context.eventTitle}之后，${cat.name}在${context.locationName}执行${context.actionName}，${positive ? "声势上涨" : "遭遇挫折"}。` };
}

async function requestAgentDialogue(cat, target, context) {
  const fallback = cats.map((speaker) => fallbackAgentLine(speaker, {
    ...context,
    targetName: speaker.id === cat.id ? target.name : cat.name,
    supportDelta: speaker.id === cat.id ? context.supportDelta : -context.supportDelta,
  }));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 32_000);
  try {
    const response = await fetch("/api/agents/turn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        sessionId: gameSessionId,
        speakers: cats.map((speaker) => speaker.id),
        focusSpeakers: [cat.id, target.id],
        scene: {
          round, event: currentEvent.title, eventDetail: currentEvent.description,
          eventRule: currentEvent.rule, headline: currentHeadline.text, headlineEffect: currentHeadline.effect,
          actor: cat.name, target: target.name, location: context.locationName,
          action: context.actionName, result: context.story, effects: context.effects,
          resources: { support: cat.support, cans, clues, chaos },
          instincts: Object.fromEntries(Object.entries(abilities).map(([id, value]) => [id, value.value])),
          npcPlans,
        },
        memories: agentMemories,
      }),
    });
    if (!response.ok) throw new Error("agent offline");
    const payload = await response.json();
    if (!Array.isArray(payload.agents) || payload.agents.length < 2) throw new Error("agent malformed");
    agentMode = payload.mode === "codex" ? "codex" : "openai";
    payload.agents.forEach((agent) => {
      if (agent.catId && agent.memory) agentMemories[agent.catId] = agent.memory;
      if (agent.catId && agent.nextLocation && agent.nextAction) {
        agentIntents[agent.catId] = { location: agent.nextLocation, action: agent.nextAction };
      }
    });
    const visible = payload.agents.filter((agent) => agent.catId === cat.id || agent.catId === target.id);
    if (visible.length < 2) throw new Error("speaking agents missing");
    return visible;
  } catch (_) {
    agentMode = "local";
    fallback.forEach((agent) => {
      agentMemories[agent.catId] = agent.memory;
      agentIntents[agent.catId] = { location: agent.nextLocation, action: agent.nextAction };
    });
    return fallback.filter((agent) => agent.catId === cat.id || agent.catId === target.id);
  } finally {
    clearTimeout(timeout);
  }
}

async function resolveAction(actionId) {
  if (phase !== "choose-action") return;
  if (actionId === "expose" && (clues < 1 || !selectedIntelCatId || !intel.some((item) => item.catId === selectedIntelCatId))) return;
  if (["deal", "giveaway"].includes(actionId) && cans < 1) return;
  phase = "resolving";
  const cat = playerCat();
  const location = LOCATIONS.find((item) => item.id === selectedLocationId);
  const action = ACTIONS[selectedLocationId].find((item) => item.id === actionId);
  moveCats();
  const encounters = shuffled(cats.filter((item) => item.id !== cat.id && item.location === selectedLocationId));
  const target = encounters[0] || randomItem(cats.filter((item) => item.id !== cat.id));
  let sceneTarget = target;
  let supportDelta = 0;
  let canDelta = 0;
  let clueDelta = 0;
  let relationDelta = 0;
  let title = `${location.name}行动完成`;
  let story = "";
  let twist = "";
  let revealed = null;
  const effects = [];
  const jinbaoChaos = cat.id === "jinbao" && Math.random() < 0.48;
  if (npcPlans[target.id]) effects.push({ text: `${target.name}自行选择：${npcPlans[target.id].actionName}`, color: target.color });

  if (jinbaoChaos) {
    let usedIntel = null;
    if (actionId === "expose") {
      sceneTarget = getCat(selectedIntelCatId);
      usedIntel = intel.find((item) => item.catId === sceneTarget.id);
      sceneTarget.support = clamp(sceneTarget.support - 9, 4, 70);
      intel = intel.filter((item) => item.catId !== sceneTarget.id);
      reservedIntelIds.delete(sceneTarget.id);
      selectedIntelCatId = null;
    } else if (["audit", "rumor", "search", "hide"].includes(actionId)) {
      revealed = revealIntel(target);
    }
    const outcome = getJinbaoOutcome(actionId, location, sceneTarget, usedIntel?.text || "未命名证据");
    supportDelta = outcome.support || 0;
    canDelta = outcome.cans || 0;
    clueDelta = outcome.clues || 0;
    relationDelta = outcome.relation || 0;
    chaos += outcome.chaos || 0;
    title = outcome.title;
    story = outcome.story;
    abilities.jinbao.value = clamp(abilities.jinbao.value + 1, 0, abilities.jinbao.max);
    twist = actionId === "expose"
      ? `${sceneTarget.name}支持度 -9 · 情报已消耗 · 歪打正着 × ${abilities.jinbao.value}`
      : `误解与回报已对应 · 歪打正着 × ${abilities.jinbao.value}`;
    beep("twist");
  } else if (["speech", "giveaway", "live", "cute"].includes(actionId)) {
    const risky = actionId === "live";
    const success = Math.random() > (risky ? 0.38 : 0.22);
    supportDelta = success ? (risky ? 11 : 7) : -5;
    canDelta = actionId === "giveaway" ? -1 : 0;
    story = success
      ? `${cat.name}在${location.name}${action.name}。${target.name}试图抢话，却被一句临场反问堵住。现场掌声里混着几声不甘心的哈气。`
      : `${cat.name}刚说到关键处，${target.name}放出一段断章取义的录音。现场安静了两秒，然后舆论彻底失控。`;
    title = success ? "这一回合，全城都记住了你的猫" : "直播没有关，翻车完整播出";
    if (!success) chaos += 8;
  } else if (["audit", "rumor", "search", "hide"].includes(actionId)) {
    clueDelta = 1;
    revealed = revealIntel(target);
    supportDelta = Math.floor(Math.random() * 5) - 1;
    story = actionId === "hide"
      ? `${cat.name}躲进纸箱等待了很久。${target.name}出现后，没有谈竞选，而是对着一台自动喂食器说：“计划照旧。”`
      : `${cat.name}在${location.name}找到一处不合理的痕迹。它指向${target.name}，但证据还不足以直接定罪。`;
    title = revealed ? `你发现了${target.name}不想公开的事` : "线索比答案更让猫不安";
    chaos = Math.max(0, chaos - (actionId === "audit" ? 7 : 2));
  } else if (["deal", "barter"].includes(actionId)) {
    if (actionId === "deal") canDelta = -1;
    if (actionId === "barter") canDelta = Math.random() > 0.3 ? 2 : -1;
    const trust = relations[target.id] || 45;
    const betrayed = Math.random() > trust / 100 + 0.23;
    relationDelta = betrayed ? -16 : 18;
    supportDelta = betrayed ? -3 : 3;
    story = betrayed
      ? `${cat.name}与${target.name}刚刚握爪，交易内容就出现在喵喵电视台滚动字幕上。对方否认泄密，字幕却还在继续。`
      : `${cat.name}与${target.name}在没有记者的角落完成交易。它们都说这是“为了城市”，罐头则悄悄换了主人。`;
    title = betrayed ? "盟约只活了四十七秒" : "一份暂时有效的秘密盟约";
    twist = betrayed ? `${target.name}背叛了你` : `${target.name}暂时成为盟友`;
  } else if (actionId === "expose") {
    clueDelta = -1;
    const exposedCat = getCat(selectedIntelCatId);
    sceneTarget = exposedCat;
    exposedCat.support = clamp(exposedCat.support - 9, 4, 70);
    supportDelta = 6;
    const usedIntel = intel.find((item) => item.catId === exposedCat.id);
    intel = intel.filter((item) => item.catId !== exposedCat.id);
    reservedIntelIds.delete(exposedCat.id);
    selectedIntelCatId = null;
    story = `${cat.name}把关于${exposedCat.name}的证据推到镜头前：“${usedIntel.text}”全城终于明白这份情报不是收藏品。`;
    title = `${exposedCat.name}的秘密被你亲手引爆`;
    twist = `${exposedCat.name}支持度 -9 · 情报已消耗`;
    chaos += 6;
  } else if (actionId === "stash") {
    canDelta = 2;
    supportDelta = Math.random() > 0.45 ? 1 : -4;
    story = `${cat.name}搬走两罐没有编号的金枪鱼。离开仓库时，它发现${target.name}一直站在门外，却没有阻止。`;
    title = "你带走了罐头，也被一双眼睛记住";
    relationDelta = -7;
  }

  const instinct = applyPlayerInstinct(cat, actionId, target);
  supportDelta += instinct.support;
  canDelta += instinct.cans;
  clueDelta += instinct.clues;
  relationDelta += instinct.relation;
  chaos += instinct.chaos;
  if (instinct.note) {
    twist = instinct.note;
  }

  if (currentEvent.bonusActions.includes(actionId)) {
    const eventEffect = currentEvent.effect;
    supportDelta += eventEffect.support || 0;
    canDelta += eventEffect.cans || 0;
    clueDelta += eventEffect.clues || 0;
    relationDelta += eventEffect.relation || 0;
    chaos += eventEffect.chaos || 0;
    effects.push({ text: `突发事件兑现：${currentEvent.rule}`, color: "#ffcf4a" });
  }

  if (currentHeadline.actions.includes(actionId)) {
    supportDelta += 2;
    effects.push({ text: `晚报风向兑现：支持度 +2`, color: "#ffcf4a" });
  }

  if (currentEvent.favored === selectedLocationId) {
    supportDelta += 3;
    effects.push({ text: "事件地点 +3 支持", color: "#ffcf4a" });
  }

  cats.filter((item) => item.id !== cat.id).forEach((other) => {
    const locationBonus = other.location === currentEvent.favored ? 3 : Math.floor(Math.random() * 5) - 2;
    other.support = clamp(other.support + locationBonus, 4, 70);
  });
  cat.support = clamp(cat.support + supportDelta, 4, 75);
  cans = clamp(cans + canDelta, 0, 12);
  clues = clamp(clues + clueDelta, 0, 9);
  if (target && relationDelta) relations[target.id] = clamp((relations[target.id] || 45) + relationDelta, 5, 95);
  chaos = clamp(chaos, 0, 99);

  if (supportDelta) effects.push({ text: `支持度 ${supportDelta > 0 ? "+" : ""}${supportDelta}`, color: supportDelta > 0 ? "#6dff9d" : "#ff5c8a" });
  if (canDelta) effects.push({ text: `罐头 ${canDelta > 0 ? "+" : ""}${canDelta}`, color: "#ff8a3d" });
  if (clueDelta) effects.push({ text: `线索 ${clueDelta > 0 ? "+" : ""}${clueDelta}`, color: "#5be7da" });
  if (relationDelta) effects.push({ text: `${target.name}关系 ${relationDelta > 0 ? "+" : ""}${relationDelta}`, color: relationDelta > 0 ? "#a791ff" : "#ff5c8a" });
  if (twist) effects.push({ text: twist, color: "#ffcf4a" });

  timeline.push({ round, title, story, catId: cat.id });
  els.headlineTicker.innerHTML = `<span>${cat.name}${supportDelta >= 0 ? "本轮声势上涨" : "遭遇舆论翻车"}；${sceneTarget.name}拒绝解释刚才发生的一切。</span><b>本轮晚报风向${currentHeadline.actions.includes(actionId) ? "已兑现：支持 +2" : "未命中"}</b>`;
  renderPlayerPanel();
  showScene({ cat, target: sceneTarget, location, title, story, effects, dialogues: null });
  const dialogues = await requestAgentDialogue(cat, sceneTarget, {
    targetName: sceneTarget.name, locationName: location.name, actionName: action.name,
    eventTitle: currentEvent.title, supportDelta, story,
    effects: effects.map((effect) => effect.text),
  });
  renderAgentDialogues(dialogues);
  renderPlayerPanel();
}

function renderAgentDialogues(dialogues) {
  const labels = {
    codex: { scene: "Codex 五猫 Agent 实时生成", network: "Codex Agent 在线", badge: "CODEX AGENT" },
    openai: { scene: "OpenAI API Agent 实时生成", network: "OpenAI Agent 在线", badge: "LIVE AGENT" },
    local: { scene: "本地人格模拟器即兴生成", network: "规则模拟器兜底运行", badge: "PERSONA SIM" },
  }[agentMode];
  els.sceneAgentStatus.textContent = labels.scene;
  els.agentModeLabel.textContent = labels.network;
  els.agentModeLabel.parentElement.classList.toggle("local", agentMode === "local");
  els.sceneQuote.innerHTML = dialogues.map((dialogue) => {
    const speaker = getCat(dialogue.catId);
    return `<article class="agent-line" style="--speaker-color:${speaker?.color || "#ffcf4a"}"><header><b>${escapeHtml(dialogue.name)}</b><em>${labels.badge}</em></header><p>“${escapeHtml(dialogue.publicLine)}”</p><small>真实内心：${escapeHtml(dialogue.innerThought)}</small></article>`;
  }).join("");
  els.continueButton.disabled = false;
}

function showScene({ cat, target, location, title, story, effects, dialogues }) {
  els.sceneDialog.style.setProperty("--scene-color", cat.color);
  els.sceneVisual.dataset.location = `${location.icon} ${location.name}`;
  els.sceneVisual.innerHTML = `<div class="scene-cats" style="--cat-color:${cat.color}">${catImage(cat)}${target ? catImage(target) : ""}</div>`;
  els.sceneKicker.textContent = `回合 ${round} · 现场结算`;
  els.sceneTitle.textContent = title;
  els.sceneStory.textContent = story;
  els.sceneAgentStatus.textContent = "两位 Agent 正在形成观点…";
  els.sceneQuote.innerHTML = dialogues ? "" : '<p class="agent-thinking">它们正在根据人格、秘密目标和刚才发生的事临场组织语言…</p>';
  els.effectList.innerHTML = effects.map((effect) => `<span class="effect-chip" style="--chip-color:${effect.color}">${escapeHtml(effect.text)}</span>`).join("");
  els.continueButton.textContent = round >= 6 ? "揭晓最终结局" : "继续下一回合";
  els.continueButton.disabled = !dialogues;
  els.sceneDialog.showModal();
  beep("win");
}

function renderPlayerPanel() {
  const cat = playerCat();
  if (!cat) return;
  els.playerCard.style.setProperty("--cat-color", cat.color);
  els.playerCard.innerHTML = `${catImage(cat)}<div><span>你的候选猫</span><h2>${cat.name}</h2><p>${cat.role}</p></div>`;
  els.supportValue.textContent = cat.support;
  els.canValue.textContent = cans;
  els.clueValue.textContent = clues;
  els.missionText.textContent = cat.secret;
  const progress = updateMissionProgress();
  els.missionProgress.style.width = `${Math.min(100, (progress.value / progress.target) * 100)}%`;
  els.missionStatus.textContent = progress.complete ? `已完成 · ${progress.label}` : progress.label;
  const ability = abilities[cat.id];
  const abilityCopy = {
    jinbao: { description: "每次误解指令，都可能把灾难变成朋友与线索。", status: `已歪打正着 ${ability.value} 次` },
    orange: { description: "承诺会立刻拉票；债务达到 3 后，每次加码都会推高混乱。", status: `承诺债务 ${ability.value} / ${ability.max}` },
    black: { description: "模型命中时降低混乱；荒诞事件可能让置信度暴跌。", status: `当前模型置信度 ${ability.value}%` },
    calico: { description: "调查会私藏秘密副本；爆料时可能自行决定扣下关键证据。", status: `秘密筹码 ${ability.value} / ${ability.max}` },
    tabby: { description: "交易会生成合同并产生复利；合同过多可能连环违约。", status: `有效猫猫合同 ${ability.value} / ${ability.max}` },
  }[cat.id];
  els.abilityPanel.style.setProperty("--cat-color", cat.color);
  els.abilityName.textContent = cat.mechanic;
  els.abilityDescription.textContent = abilityCopy.description;
  els.abilityProgress.style.width = `${Math.min(100, (ability.value / ability.max) * 100)}%`;
  els.abilityStatus.textContent = abilityCopy.status;
  els.relationshipList.innerHTML = cats.filter((item) => item.id !== cat.id).map((other) => {
    const value = relations[other.id] || 45;
    const color = value >= 65 ? "#6dff9d" : value < 35 ? "#ff5c8a" : "#a791ff";
    return `<div class="relation-row">${catImage(other)}<div><div class="relation-name"><b>${other.name}</b><span>${value >= 65 ? "信任" : value < 35 ? "警惕" : "观望"}</span></div><div class="relation-bar"><i style="--relation:${value}%;--relation-color:${color}"></i></div></div><span class="relation-number">${value}</span></div>`;
  }).join("");
  els.intelCount.textContent = `${intel.length} 持有 · ${intelDiscovered} 查明`;
  els.intelList.innerHTML = intel.length ? intel.map((item) => {
    const selected = selectedIntelCatId === item.catId;
    const reserved = reservedIntelIds.has(item.catId);
    const status = selected ? "已锁定：前往电视台" : reserved ? "已决定：留到计票" : "待决定";
    return `<li><article class="intel-target ${selected ? "selected" : ""} ${reserved ? "reserved" : ""}">
      <b>${status}</b><span>${escapeHtml(item.text)}</span>
      <small>现在爆料：消耗 1 线索，目标 -9、自己 +6、混乱 +6<br />留到计票：目标悄悄 -4</small>
      <div class="intel-decisions">
        <button type="button" data-intel-action="expose" data-intel-cat="${item.catId}">${selected ? "已前往电视台" : "去电视台爆料"}</button>
        <button type="button" data-intel-action="reserve" data-intel-cat="${item.catId}" class="${reserved ? "active" : ""}">${reserved ? "已保留到计票" : "保留到计票"}</button>
      </div>
    </article></li>`;
  }).join("") : "<li class=\"intel-empty\">调查或偷听获得情报；持有到计票也能削弱对手。</li>";
}

function continueRound() {
  els.sceneDialog.close();
  if (round >= 6) {
    showEnding();
    return;
  }
  round += 1;
  prepareRound();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showEnding() {
  const cat = playerCat();
  const progress = updateMissionProgress();
  const friendCount = Object.values(relations).filter((value) => value >= 65).length;
  const twists = [];

  if (cat.id === "jinbao" && friendCount >= 2) {
    cat.support += 12;
    twists.push("两位朋友临时组成“金宝保护联盟”，把自己的票转给了它");
  }
  if (cat.id === "orange" && cans >= 6) { cat.support += 7; twists.push("橘座用最后一批罐头发动了深夜拉票"); }
  if (cat.id === "black" && chaos <= 35 && clues >= 2) { cat.support += 8; twists.push("墨局的预测模型第一次没有出错"); }
  if (cat.id === "calico" && intelDiscovered >= 3 && intel.length >= 1) { cat.support += 8; twists.push("花探长查明三条秘密，并把最贵的一条留到了计票夜"); }
  if (cat.id === "tabby" && cans >= 7 && friendCount >= 1) { cat.support += 7; twists.push("虎老板动用了市场库存与唯一的盟友"); }
  if (cat.id === "orange" && abilities.orange.value >= 5) { cat.support -= 8; twists.push("橘座最后一张承诺支票提前到期，财政当场追债"); }
  if (cat.id === "black" && abilities.black.value >= 82) { cat.support += 4; twists.push("墨局的高置信度模型说服了最后一批摇摆猫"); }
  if (cat.id === "calico" && abilities.calico.value >= 3) { cat.support += 4; twists.push("花探长用未公开的秘密换来了关键沉默"); }
  if (cat.id === "tabby" && abilities.tabby.value >= 3) { cat.support += abilities.tabby.value; twists.push("虎老板的猫猫合同在计票夜开始产生复利"); }

  intel.forEach((item) => {
    const exposedCat = getCat(item.catId);
    exposedCat.support = clamp(exposedCat.support - 4, 4, 70);
    twists.push(`你保留的${exposedCat.name}情报在计票夜发酵，使其支持度 -4`);
  });

  let winner = [...cats].sort((a, b) => b.support - a.support)[0];
  let title;
  let story;
  if (chaos >= 88) {
    title = "没有猫当上市长";
    story = "混乱指数冲破警戒线时，地下自动喂食器接管了市政厅。五只猫一致同意：谁按时出粮，谁就是合法政府。";
    twists.push("自动喂食器成为猫猫市第一任非猫市长");
  } else if (winner.id === cat.id) {
    title = `${cat.name}当选市长`;
    story = cat.id === "jinbao"
      ? "其他候选猫忙着计算胜率时，金宝只是把最后一罐鱼分给了朋友。没人知道这是不是策略，但全城决定相信它一次。"
      : `${cat.name}以最高支持度赢下选举。庆祝现场刚刚开始，花探长就递来一只写着“任期第一天”的密封信封。`;
  } else if (progress.complete) {
    title = `${winner.name}赢了选举，你赢了另一局`;
    story = `${winner.name}坐上市长椅，但${cat.name}已经完成真正的秘密任务。第二天，全城都在讨论选举结果，只有你知道谁才是幕后赢家。`;
  } else {
    title = `${winner.name}在最后一分钟翻盘`;
    story = `${cat.name}没能赢下选举。计票结束后，你发现最后一回合的决定让${winner.name}获得了关键优势——猫猫市从不奖励犹豫。`;
  }

  const displayCat = chaos >= 88 ? cat : winner;
  els.endingDialog.style.setProperty("--winner-color", displayCat.color);
  els.endingPhoto.innerHTML = catImage(displayCat);
  els.endingTitle.textContent = title;
  els.endingStory.textContent = `${story}${twists.length ? ` 最终反转：${twists.join("；")}。` : ""}`;
  els.endingSummary.innerHTML = `
    <div><span>你的支持度</span><b>${cat.support}</b></div>
    <div><span>秘密任务</span><b>${progress.complete ? "完成" : "未完成"}</b></div>
    <div><span>城市混乱</span><b>${chaos}</b></div>`;
  els.endingDialog.showModal();
  phase = "complete";
  beep("win");
}

function returnToSelection() {
  [els.sceneDialog, els.endingDialog, els.briefingDialog].forEach((dialog) => { if (dialog.open) dialog.close(); });
  els.gameApp.hidden = true;
  els.selectionScreen.hidden = false;
  document.body.classList.remove("is-playing");
  phase = "select";
  selectedCatId = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

els.selectionGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-cat]");
  if (card) openBriefing(card.dataset.cat);
});
els.confirmCandidate.addEventListener("click", () => startGame(pendingCatId));
document.querySelector("#closeBriefing").addEventListener("click", () => els.briefingDialog.close());
document.querySelector("#backHome").addEventListener("click", (event) => { event.preventDefault(); returnToSelection(); });
els.mapGrid.addEventListener("click", (event) => {
  const location = event.target.closest("[data-location]");
  if (location) selectLocation(location.dataset.location);
});
els.actionOptions.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action) resolveAction(action.dataset.action);
});
els.undoLocation.addEventListener("click", undoLocation);
els.continueButton.addEventListener("click", continueRound);
els.intelList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-intel-action]");
  if (button) chooseIntelAction(button.dataset.intelAction, button.dataset.intelCat);
});
document.querySelector("#playAgain").addEventListener("click", returnToSelection);
document.querySelector("#closeEnding").addEventListener("click", () => els.endingDialog.close());
document.querySelector("#soundToggle").addEventListener("click", (event) => {
  soundEnabled = !soundEnabled;
  event.currentTarget.textContent = `音效：${soundEnabled ? "开" : "关"}`;
  event.currentTarget.setAttribute("aria-pressed", String(soundEnabled));
  beep();
});

function registerWebMCPTools() {
  if (window.top !== window) return;
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (tool) => { try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {} };
  register({
    name: "choose_cat_candidate", title: "选择候选猫", description: "选择一只候选猫并开始六回合的猫猫市长游戏。",
    inputSchema: { type: "object", properties: { cat_id: { type: "string", enum: CAT_TEMPLATES.map((cat) => cat.id) } }, required: ["cat_id"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!CAT_TEMPLATES.some((cat) => cat.id === input?.cat_id)) throw new Error("未知候选猫");
      startGame(input.cat_id);
      return { status: "started", candidate: playerCat().name, round, phase };
    },
  });
  register({
    name: "choose_cat_city_location", title: "选择行动地点", description: "在当前回合选择候选猫要前往的猫猫市地点。",
    inputSchema: { type: "object", properties: { location_id: { type: "string", enum: LOCATIONS.map((item) => item.id) } }, required: ["location_id"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (phase !== "choose-location") throw new Error("当前阶段不能选择地点");
      selectLocation(input.location_id);
      return { status: "location_selected", location: selectedLocationId, available_actions: ACTIONS[selectedLocationId].map((item) => item.id) };
    },
  });
  register({
    name: "perform_cat_campaign_action", title: "执行竞选行动", description: "执行当前地点的一项竞选行动，并结算猫咪遭遇和资源变化。",
    inputSchema: { type: "object", properties: { action_id: { type: "string" } }, required: ["action_id"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    async execute(input) {
      if (phase !== "choose-action" || !ACTIONS[selectedLocationId].some((item) => item.id === input?.action_id)) throw new Error("当前行动不可用");
      await resolveAction(input.action_id);
      return { status: "resolved", round, candidate: playerCat().name, support: playerCat().support, cans, clues, chaos };
    },
  });
}

renderSelection();
registerWebMCPTools();
