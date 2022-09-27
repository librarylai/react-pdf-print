# React PDF 與 列印 相關套件

最近剛好與朋友討論到將『前端畫面直接轉成 PDF 下載、列印』的部分，所以就整理了幾套關於這部分的 React 套件。

## react-to-pdf

> **GitHub**：[**react-to-pdf**](https://github.com/ivmarcos/react-to-pdf#readme) > **安裝：** yarn add react-to-pdf

**react-to-pdf** 提供了 `<ReactToPdf>` 的 component 來將 HTML 內容轉成 PDF 檔，我們可以透過 `targetRef` 屬性來『圈出』需要轉換的區塊。

#### 在設定`targetRef` 方面有兩種模式可以使用：

1. **Using inner target ref**
   透過將 `ReactToPdf` Child Function 的參數 `targetRef` 放到想要轉換的 Element 的 ref 屬性內，就可以將該區塊轉換成 PDF，該方法雖然直觀但缺點是需要將內容都寫在 Child Function 內，因此容易造成該區塊程式碼肥大、不好維護。

```jsx=
<ReactToPdf>
   {({toPdf, targetRef}) =>  (
     <ReactToPDFContainer ref={targetRef}>
       <h1>MUI Table</h1>
       {/* 假資料 Table */}
       {renderMuiTableView()}
     </ReactToPDFContainer>
   )}
</ReactToPdf>
```

2. **Using outer target ref**
   上面的方法是寫在 Child Function 內，而另一種方法是透過 `ref` 來綁定區塊，因此我們就不需要將內容都限制在 Child Function 內，我們可以透過 `useRef` 來創建一個 **ref**，並且將該 `ref` 分別綁定到 `ReactToPdf` 的 `targetRef` Props 與需要轉換的 Element 的 ref 屬性上，就可以將該區塊轉換成 PDF 嘍！

```jsx=
// 透過 useRef Hook 產生一個 custom ref
const pdfRef = useRef()
// render
<div>
  {/* 將 ref 綁定到  targetRef props 上  */}
  <ReactToPdf targetRef={pdfRef} filename='muiTable.pdf'>
    {({ toPdf }) => (
      <Button variant='contained' onClick={toPdf}>
        產生PDF (Generate pdf)
      </Button>
    )}
  </ReactToPdf>
  {/* 將 ref 也綁定到需要轉成 PDF 的內容上  */}
  <ReactToPDFContainer ref={pdfRef}>
    <Title>MUI Table</Title>
    {renderMuiTableView()}
  </ReactToPDFContainer>
</div>
```

### 成果

![](https://i.imgur.com/IdmNRF4.gif)

## react-to-print

> **GitHub**：[**react-to-print**](https://github.com/gregnb/react-to-print) >**安裝：** yarn add react-to-print

**react-to-print** 主要的功能是幫我們『列印選取的 HTML 內容』，如果去看它的程式碼可以發現作者透過 iframe.contentWindow.print() 來呼叫 browser 的列印功能，當然裡面還有處理很多不支援或是 ios,android 上的部分。

#### 簡單介紹 react-to-print 在使用的幾種方式：

1. **use ReactToPrint component**
   **class component** 的方法跟上面的 `react-to-pdf` 很類似，我們可以透過 `<ReactToPrint>` 來處理想要列印的區塊。

```jsx=
import ReactToPrint from 'react-to-print';
function Print(){
    const printRef = createRef()
    // render 需要列印的相關內容
    function renderUseReactToPrintComponent() {
    return (
      <>
         <ReactToPrint
          // trigger 會在我們傳入的 React Component or Element 上面加上一個 onClick 事件，因此我們不需要自己去寫 onClick 事件
          trigger={() => <Button variant='contained'>列印 or 儲存成 PDF (Print or Save to PDF)</Button>}
          // content 主要回傳我們要列印的內容，我們透過 ref 來 reference 需要列印的區塊(DOM)
          content={() => printRef.current}
        />
        <ReactToPrintContainer ref={printRef}>
          <h1>MUI Table To Print</h1>
          {/* 假資料 Table */}
          {renderMuiTableView()}
        </ReactToPrintContainer>
      </>
    )
  }
    return (
      <main className={styles.main}>
        <h1>將下面內容透過 react-to-print 套件列印內容</h1>
        {/* 使用 component 版本 */}
        {renderUseReactToPrintComponent()}
      </main>
    )
}
```

2. **use useReactToPrint Hook**
   **react-to-print** 也很貼心的提供 `useReactToPrint` Hook 的方式來讓我們用更少的步驟完成列印的功能。
   仔細看可以發現，Hook 與 Component 所需要設定的內容很相似，差別在於一個是在 Hook function argument 上，一個是寫在 Component props 上。而兩種方法沒有誰好誰壞，可以自行依照實際情境來選擇其中一種方式使用。

```jsx=
import { useReactToPrint } from 'react-to-print'
function Print(){
    const printRef = createRef()
    // 產生列印的 trigger function
    const handlePrint = useReactToPrint({
        // 我們透過 ref 來 reference 需要列印的區塊(DOM)
        content: () => printRef.current,
    })
    function renderUseReactToPrintHook() {
        return (
          <div>
            <Button variant='contained' onClick={handlePrint}>
              列印 or 儲存成 PDF (Print or Save to PDF)
            </Button>
            <ReactToPrintContainer ref={printRef}>
              <h1>MUI Table To Print</h1>
              {/* 假資料 Table */}
              {renderMuiTableView()}
            </ReactToPrintContainer>
          </div>
        )
  }
    return(
        <main className={styles.main}>
            <h1>將下面內容透過 react-to-print 套件列印內容</h1>
            {/* 使用 hook 版本 */}
            {renderUseReactToPrintHook()}
        </main>
    )
}
```

### 成果

可以看到當我們按下『列印』按鈕後，自動跳出了 Browser 內建的列印畫面，讀者們可以自行在 console 中用 `window.print()` 嘗試看看，可以發現會跳出一樣的列印畫面，差別在於 **react-to-print** 套件只列出了『我們所選取的部分』而已。( ps.`window.print()` 預設是印整個 window 畫面）

如果是使用 Mac 電腦可以看到有『儲存為 PDF』的選項，因此如果是想要下載 PDF 的話，可以考慮直接使用 **react-to-print** 即可。(ps. up 因為沒 windows 電腦，因此 windows 系統不確定有沒有下載的部分。)

![](https://i.imgur.com/IwywvBu.gif)

## React-PDF (Render PDF 內容到頁面中)

> **GitHub**：[**React-PDF**](https://github.com/wojtekmaj/react-pdf) > **安裝**： yarn add react-pdf

上面介紹的 **react-to-pdf** 與 **react-to-print** 都是偏向於將 HTML 內容產生成 PDF 檔案，而在工作上比較常碰到的需求是『將 PDF 內容呈現在網頁上』，例如將『法規』、『使用條款』...等 pdf 內容呈現在網頁上，如果單純使用 Html 來排版可能幾個小時就不見了，而且這種客製化的畫面很難必此之間共用，在大型的架構下就容易造成
