## プロジェクトルール

### ディレクトリ構成

**具体 > 抽象（粒度 > 概念）**

```
components/
│         ┝domains/
│         │        └someDomains/
│         │        │           └atoms/
│         │        │           │      └someComponents/
│         │        │           └molecules/
│         │        │           │         └someComponents/
│         │        │           └organisms/
│         │        │                     └someComponents/
│         │        └someDomains/
│         │                     └atoms/
│         │                     │     └someComponents/
│         │                     └molecules/
│         │                     │         └someComponents/
│         │                     └organisms/
│         │                               └someComponents/
│         ┝shareables/
│                    └atoms/
│                    │      └someComponents/
│                    └molecules/
│                    │          └someComponents/
│                    └（organisms）/
│                                └someComponents/
pages/
     └somePagesFiles and Folders
```

### Implements Rules（実装ルール）

#### スタイルとレイアウトの適用範囲（shareables ディレクトリ内）

- 1. _親コンポーネントが子コンポーネントのスタイルを決めてはならない。_
     =子コンポーネントが見た目のスタイルの責務を担う。
  - ※ただし、一部許容は認める。（大前提コンポーネンとは分けて、許容する場合は相談）
    - （例：background-color, coloer, font-weight, border, width, height, etc...）
- 2. _子コンポーネントが親コンポーネントのレイアウトを決めてはならない。_
     =親コンポーネントが子コンポーネントのレイアウトを決める責務を担う。
  - （例：margin, text-align, flex, grid, etc..）
- 3. _レイアウト系を定める型定義 Props の種類_
  - layout：親タグに囲まれた子のレイアウトを定める。
    - （例：flex, grid, etc...）
  - styles：そのタグ（要素）layout を除くスタイルを定める。
    - （例：margin, padding, width, height, etc...）

**例：子コンポーネントが親コンポーネントのレイアウトを決めてはならない。**

```
import type { VFC } from "react"

const GrandParent:VFC = () => {
	return <Parent layout="flex items-center" styles="mt-5" />
}

type ParentProps = {
	layout: string;
	styles: string;
}

const Parent: VFC<ParentProps> = ({ layout, styles }) => {
	return (
	<div className={layout}>
		<Child name="Parent" styles={styles} />
		<Child name="Parent" styles={styles} />
	</div>
	)
}

type ChildProps = {
	name: string;
	styles: string;
}

const Child: VFC<ChildProps> = ({ name, styles }) => {
	return <p className={`text-red-500 ${styles}`}>{ name }</p>
}
```

参考記事：[フロントエンドのコンポーネント設計に立ち向かう](https://qiita.com/seya/items/8814e905693f00cdade2)

#### 再利用とユニークコンポーネントの切り分け

- 1. 1 回のみ使用するコンポーネント については、Atoms または Molcules の「domains/」ディレクトリで管理する。
- 2. 2 回以上使うコンポーネントについては、Atoms または Molcules の「shareables/」ディレクトリで管理する。（Rule of Two）
- 3. Organisms や Pages では原則、再利用性を考慮しない。
     =全てユニークなコンポーネントと考える。
  - Organisms での例外：Header, Footer, SideBar, etc...

#### Atomic Design の中身の構成

- 1. Atoms：これ以上分割できない要素で構成させる。
  - （例：input, h1, p, span, textarea, etc...）
- 2. Molecules：複数の Atoms もしくは HTML タグだけで構成される。
- 3. Organisms は複数の Atoms、Molecules もしくは HTM タグだけで構成される。
- 4. Pages は Organisms もしくは HTML タグだけで構成される。
- 5. Template フォルダは原則用意しない。
- ※ただし、一部許容は認める。

**単一方向の原則に従って行う。**
**つまり、Atoms は Molecules 以上のコンポーネント群、Molecules は Organisms 以上のコンポーネント群を参照することはできない。**

参考記事：[Atomic Design ベースのコンポーネント設計を考えてみた](https://mya-ake.com/posts/component-design-based-on-atomic-design/)

#### React や Redux の Hooks での状態管理規則

- 1. Atoms や Molcules は再利用性を考慮するので、状態の管理は行わない。
     つまり、Atoms や Molecules では Props を用いて実装をする。
  - ただし、「domains/」で管理されているコンポーネント群については、再利用性を考慮しないので、状態管理をして良いものとする。
    - （例：useAppSelector, useAppDispatch, useState, useReducer, etc...）
- 2. Organisms 以上のコンポーネントで状態管理を行う。
     つまり、shareables に属する Atoms や Molecules に渡す場合は、Props を用いる。
  - ただし、「domains/」で管理されているコンポーネント群については、再利用性を考慮しないので、状態管理をして良いものとする。
    - （例：useAppSelector, useAppDispatch, useState, useReducer, etc...）

#### 関数コンポーネントの命名規則

##### 「Domains」ディレクトリ以下の関数コンポーネントの命名規則

- 1. 定義名は、原則「D + C + B」のアッパーキャメルケースに従う。

##### 「Shareables」ディレクトリ以下の関数コンポーネントの命名規則

- 1. 定義名は、原則「（C）+ B」のアッパーキャメルケースに従う。

_📁 D（Domain）：顧客情報一覧であれば Customers、顧客詳細であれば Customer のように関心のある事柄をドメインとする。_
例：Customer, User, etc...

_📁 C（Case）：Domain や Detail の状況を説明する必要がある場合に用いる。顧客情報一覧から検索をかける値を型定義するのであれば、「CustomersSearch」のような命名にする。_
**原則、状況説明できるもの（動詞や形容詞）を用いる。**
例：Search, Add, etc...

_📁 B（Base）：基礎的な機能（名詞）そのもの、事実上の “型” を表す単語を用いる。_
例： Button, Card, etc...

参考記事：[BCD Design によるコンポーネントの分類](https://qiita.com/misuken/items/19f9f603ab165e228fe1)

#### import や export のルール

- 1. 関数コンポーネントはデフォルト export を用いる。
- 2. 関数コンポーネント以外は**名前付き export**を用いる。
- 3. 関数コンポーネントを import する場合は、**ファイル名と同じ名前で import**する。
- 4. ディレクトリに 1 つ index.ts という export のルートファイルを作成する。

例１：関数コンポーネントはデフォルト export を用いる。

```
const Example: VFC = () => (
  <p>Example</p>
);

export default Example;
```

例 2：関数コンポーネント以外は**名前付き export**を用いる。

```
export const exampleFunc = ()=> {
	return "exampleFunc"
}
```

例３：関数コンポーネントを import する場合は、**ファイル名と同じ名前で import**する。

```
import Example, { exampleFunc } from './Example';
```

例４：ディレクトリに 1 つ index.ts という export のルートファイルを作成する。

```
// index.ts

//デフォルトexportに名前をつけて、再エクスポート。
export { default as Example } from './Example';

のように1つのファイルから他のファイルでimportできるようにする。
```

参考記事：[TypeScript v3.8.1-rc 変更点](https://qiita.com/vvakame/items/72da760526ec7cc25c2d)

#### 型定義のルール

- 1. 定義名は、原則「D + （D） + （C） + Type」のアッパーキャメルケースに従う。
- 2. オブジェクトの型定義には、interface は使用せずに原則 type で統一する。
  - ※interface は知らぬ間に拡張されるリスクが存在する。
- 3. 型定義を import する場合は必ず「import type { someTypes }」を使用する。
- 4. 型定義を export する場合は必ず「export type { someTypes }」を使用する。
  - 「default export」は使わない。
- 5. 同じ型定義を 2 回以上使うものに関しては、「global.d.ts」で管理する。
- 6. 関数コンポーネントの Props の型定義は「PropsType」に統一する。

_📁 D（Domain）：顧客情報一覧であれば Customers、顧客詳細であれば Customer のように関心のある事柄を Domain とする。_

_📁 D（Detail）：Domain に含まれている情報を抜き出すときに用いる。顧客情報一覧の中の住所一覧であれば「CustomersAddresses」などにする。_

_📁 C（Case）：Domain や Detail の状況を説明する必要がある場合に用いる。顧客情報一覧から検索をかける値を型定義するのであれば、「CustomersSearch」のような命名にする。_
**原則、状況説明できるもの（動詞や形容詞）を用いる。**

_📁 Type：最後に export で型定義ファイル以外のファイルの競合を発生させないために末尾に原則「Type」の単語をつける。_

例１：定義名は、原則「D + （D） + （C） + Type」のアッパーキャメルケースに従う。

```
type ExampleTitleSearchType = {
	name: string;
	telephone: string;
}
```

例３：型定義を import する場合は必ず「import type { someTypes }」を使用する。

```
import type { ExampleTitleSearchType } from './ExampleTitleSearchType';
```

例４：型定義を export する場合は必ず「export type { someTypes }」を使用する。

```
type ExampleTitleSearchType = {
	name: string;
	telephone: string;
}

export type { ExampleTitleSearchType }
```

例５：関数コンポーネントの Props の型定義は「PropsType」に統一する。

```
type PropsType = {
	name: string;
}

const Example: VFC<PropsType> = ({name}) => (
  <p>{ name }</p>
);

export default Example;
```

参考記事：[interface と type の違い、そして何を使うべきかについて](https://zenn.dev/luvmini511/articles/6c6f69481c2d17)

最後に今回 PJ ルール決める際に参考になった記事を一覧

- [フロントエンドのコンポーネント設計に立ち向かう](https://qiita.com/seya/items/8814e905693f00cdade2)
- [より良い開発体験に ~Atomic Design によるコンポーネント設計~](https://qiita.com/katsutakashima/items/87dc0dc2d1190d7d9731)
- [BCD Design によるコンポーネントの分類](https://qiita.com/misuken/items/19f9f603ab165e228fe1)
- [TypeScript v3.8.1-rc 変更点](https://qiita.com/vvakame/items/72da760526ec7cc25c2d)
- [BASE の Vue.js コンポーネントの設計について登壇してきました](https://devblog.thebase.in/entry/2019/11/27/110000)
- [Atomic Design ベースのコンポーネント設計を考えてみた](https://mya-ake.com/posts/component-design-based-on-atomic-design/)
- [Atomic Design から派生した、“オルタネイティヴ”な 5 つのデザインシステム](https://logmi.jp/tech/articles/300657)
