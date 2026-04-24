# Zotero DTIC API Scraper

🚀 **A modern, API-based Zotero Translator for the Defense Technical Information Center (DTIC).**

官方自带的 DTIC 抓取器停留在 2013 年，早已在 DTIC 的多次前端重构中彻底失效。本项目通过直接调用 DTIC 底层隐藏的 JSON API，无视前端排版变化，实现文献元数据与 PDF 的 100% 精准抓取。

## ✨ 特性 (Features)
- **精准提取**：基于底层 API，精准解析标题、机构、AD 编号、摘要。
- **作者分离**：自动清洗并分离作者的姓氏与名字。
- **智能标签**：自动过滤水词，仅保留带 `*` 号的核心主题词（Primary Descriptors）。
- **PDF 附件**：如果报告提供全文下载，会自动挂载 PDF 附件。

## 📦 安装说明 (Installation)
1. 下载本仓库中的 `DTIC_API_Scraper.js` 文件。
2. 打开 Zotero，依次点击菜单栏：`编辑 -> 首选项 -> 高级 -> 文件和文件夹 -> 打开数据目录`。
3. 找到 `translators` 文件夹，将下载的 `.js` 文件丢进去。
4. **【关键步】**在浏览器右上角右键点击 Zotero 插件图标 -> `选项 (Options)` -> `高级 (Advanced)`。
5. 依次点击 `Update Translators (更新抓取器)` 和 `Reset Translators (重置抓取器)`。
6. 刷新 DTIC 网页，点击插件图标即可抓取！

## ⚠️ 免责声明 (Disclaimer)
**本人不对本脚本的长期可用性做保证，遇到问题欢迎提交issue或者pull request**
