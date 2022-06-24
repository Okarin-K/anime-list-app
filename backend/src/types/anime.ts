export type Anime = {
    /**
     * APIで管理するアニメ作品に割り当てられているユニークなID
     */
    readonly id:	number,

    /**
     * アニメ作品名
     */
    readonly title: string,

    /**
     * アニメのサムネ画像
     */
    readonly image: string

    /**
     * アニメ作品名の略称1
     */
    readonly title_short1: string,

    /**
     * アニメ作品名の略称2
     */
    readonly title_short2: string,

    /**
     * アニメ作品名の略称3
     */
    readonly title_short3: string,
    
    /**
     * アニメ作品の公式URL
     */
    readonly public_url: string,

    /**
     * ツイッターアカウント
     */
    readonly twitter_account: string,

    /**
     * ツイッターハッシュタグ
     */
    readonly twitter_hash_tag: string,

    /**
     * coursマスターのID
     */
    readonly cours_id: number,

    /**
     * データの作成日時
     */
    readonly created_at: string,

    /**
     * データの更新日時
     */
    readonly updated_at: string,

    /**
     * 男性向け、女性向け
     */
    readonly sex: number,

    /**
     * 続編モノの場合は1以上の数値が入る
     */
    readonly sequel: number,

    /**
     * 代表聖地地区の5桁の市区町村コード
     */
    readonly city_code: number,

    /**
     * 代表聖地地区の市区町村名
     */
    readonly city_name: string,
}