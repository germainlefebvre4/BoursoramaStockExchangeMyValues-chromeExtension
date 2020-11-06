// stock_array = document.getElementsByClassName("c-shadow-overflow");
// stock_row_first = stock_array[0].getElementsByClassName("c-table__body")[0]["children"];
// stock_cell = stock_row_first[0].getElementsByClassName("c-table__cell");
// stock_title = stock_cell[0].getElementsByClassName("o-pack__item");
// stock_cell_add = stock_row_first[0].insertCell(1);

// stock_title = stock_title[0].innerText;
// stock_cell_add.innerHTML = stock_title;

stock_my_values = {
    "BOUYGUES": 30.16,
    "CREDIT AGRICOLE SA": 7.10,
    "EDF": 9.94,
    "ENGIE": 11.01,
    "FAURECIA": 32.73,
    "FDJ": 31.60,
    "GENFIT": 3.39,
    "M6 METROPOLE TELE.": 10.22,
    "NACON": 7.26,
    "NATIXIS": 1.99,
    "ORANGE": 9.21,
    "PEUGEOT": 15.14,
    "SAINT-GOBAIN": 33.76,
    "SOCIETE GENERALE": 11.84,
    "SUEZ": null,
    "THALES": 60.55,
    "TOTAL": 27.30,
    "VEOLIA": 17.49
}

stock_table = document.getElementsByClassName("c-table")[0];
stock_head_cell_value = stock_table.tHead.children[0];
stock_head_cell_value.insertCell(1).outerHTML = '<th class="c-table__cell c-table__cell--head c-table__cell--dotted / u-text-uppercase c-table__cell--sorted"><h3 class="c-table__title">My data</h3></th>';
stock_head_cell_value.insertCell(2).outerHTML = '<th class="c-table__cell c-table__cell--head c-table__cell--dotted / u-text-uppercase c-table__cell--sorted"><h3 class="c-table__title">My perc</h3></th>';


stock_rows = stock_table.tBodies[0].children;
console.log(stock_rows);
stock_rows_length = stock_rows.length;
for ( i=0 ; i<stock_rows_length ; i++ ) {
    stock_title = stock_rows[i].children[0].children[0].children[0].children[0].innerHTML;
    stock_value = Number(stock_rows[i].children[1].innerHTML);
    stock_my = stock_my_values[stock_title];
    stock_my_cell = stock_rows[i].insertCell(1);
    stock_perc_cell = stock_rows[i].insertCell(2);
        
    if (stock_title in stock_my_values && stock_my != null) {
        value_sort = stock_my_values[stock_title];
        value_data = stock_my_values[stock_title];
        perc_sort = stock_my_values[stock_title];
        perc_data =  Number.parseFloat((stock_value/stock_my-1)*100).toPrecision(2) + '%';
        if (stock_my < stock_value) {
            if (stock_my < stock_value*(1-0.008)) {
                stock_my_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + value_sort + '"><div style="color:#2cc357;">' + value_data + '</div></td>';
                stock_perc_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + perc_sort + '"><div style="color:#2cc357;">' + perc_data + '</div></td>';
            } else {
                stock_my_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + value_sort + '"><div style="color:#FFA500;">' + value_data + '</div></td>';
                stock_perc_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + perc_sort + '"><div style="color:#FFA500;">' + perc_data + '</div></td>';
            }
        } else if (stock_my > stock_value) {
            stock_my_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + value_sort + '"><div style="color:#f11c3a;">' + value_data + '</div></td>';
            stock_perc_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + value_sort + '"><div style="color:#f11c3a;">' + perc_data + '</div></td>';
        } else {
            stock_my_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + value_sort + '">' + value_data + '</td>';
            stock_perc_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted " data-sort-value="' + perc_sort + '">' + perc_data + '</td>';
        }
    } else {
        stock_my_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted "></td>';
        stock_perc_cell.outerHTML = '<td class="c-table__cell c-table__cell--dotted "></td>';
    }
}