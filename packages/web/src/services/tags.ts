// const mockTags = {
//   company: ["福岡", "東京", "IT", "メーカー", "夏インターン", "早期選考"],
//   account: ["業界", "職種", "相談方法"],
// };
const mockTags = {
  company: [
    "福岡",
    "東京",
    "IT",
    "メーカー",
    "夏インターン",
    "早期選考",
    "大阪",
    "名古屋",
    "関西",
    "スタートアップ",
    "大手企業",
    "外資系",
    "金融",
    "コンサル",
    "商社",
    "自動車",
    "ゲーム",
    "AI",
    "SaaS",
    "研究開発",
    "リモート可",
    "フレックス制度",
    "新卒採用",
    "通年採用",
    "冬インターン",
    "1day仕事体験",
    "技術職",
    "総合職",
    "文理不問",
  ],
  account: [
    "業界",
    "職種",
    "相談方法",
    "志望動機",
    "自己PR",
    "ES添削",
    "面接対策",
    "ガクチカ",
    "適性検査",
    "SPI",
    "OB訪問",
    "キャリア相談",
    "働き方",
    "勤務地希望",
    "年収",
  ],
};

export type TagKind = keyof typeof mockTags;

export async function pullTags(kind: TagKind): Promise<string[]> {
  return mockTags[kind] ?? [];
}
