Welcome to paginga
===
Paginga is just a simple jQuery Pagination Plugin.

![paginga-logo](https://cloud.githubusercontent.com/assets/1250622/11698733/92196d1e-9ec0-11e5-85cb-f41549ba227d.png)

## Demo

An example is available [here](http://mrk-j.github.io/paginga/example.html).

## Usage

Include paginga in your page:

```html
<script src="https://cdn.rawgit.com/mrk-j/paginga/v0.8.1/paginga.jquery.min.js"></script>
```

Use the following markup for the items you want to paginate:

```html
<div class="paginate 1">
  <div class="items">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
  </div>
  <div class="pager">
    <div class="firstPage">&laquo;</div>
    <div class="previousPage">&lsaquo;</div>
    <div class="pageNumbers"></div>
    <div class="nextPage">&rsaquo;</div>
    <div class="lastPage">&raquo;</div>
  </div>
</div>
```

Call the paginate plugin:

```js
$(".paginate").paginga({
  // use default options
});
```

## Options

| Name             | Type             | Default                    | Description                                                                                                                                         |
|------------------|------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| itemsPerPage     | integer          | 3                          | The number of items on one page.                                                                                                                    |
| itemsContainer   | string           | ".items"                   | Selector for element containing all the elements that should be paginganated.                                                                       |
| item             | string           | "> div"                    | Selector for elements in `itemsContainer`.                                                                                                          |
| page             | integer          | 1                          | This is the initial page.                                                                                                                           |
| nextPage         | string           | ".nextPage"                | Selector for the element to bind next page action.                                                                                                  |
| previousPage     | string           | ".previousPage"            | Selector for the element to bind previous page action.                                                                                              |
| firstPage        | string           | ".firstPage"               | Selector for the element to bind first page action.                                                                                                 |
| lastPage         | string           | ".lastPage"                | Selector for the element to bind last page action.                                                                                                  |
| pageNumbers      | string           | ".pageNumbers"             | Selector for the element the page numbers are placed in.                                                                                            |
| maxPageNumbers   | integer or false | false                      | If set to an `integer` the maximum of visible pages in the `.pageNumbers` element is equal to this setting.                                       |
| currentPageClass | string           | "active"                   | Class name for the active page anchor in `pageNumbers` element.                                                                                     |
| pager            | string           | ".pager"                   | Selector for element that contains all pagination anchors. This element is hidden when `autoHidePager` is set to `true` and there is only one page. |
| autoHidePager    | boolean          | true                       | If set `true` the `pager` element is set to hidden if there is only one page.                                                                       |
| scrollToTop      | object or false  | { offset: 15, speed: 100 } | If not set `false` the first element on the page will be scrolled into the viewport on paginate.                                                    |
| history          | boolean          | false                      | If set `true`, `paginga` will automatically keep track of the user going through the pages and add a numeric hash to the URL. This way the user can use the back button to go to the previous page. This also works when the user has visited an external website. The browser must support [history management](http://caniuse.com/#feat=history). |
| historyHashPrefix | string | "page-" | With this parameter you can set the prefix for the history hash. If you are using multiple `paginga` instances on one page you need to alter this setting for each instance to ensure the history will work properly and independently for all instances. |
