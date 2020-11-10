function add_table_row_empty(id) {
    currentTable = document.getElementById("stock-table");
    newLine = currentTable.insertRow();

    newCellKey = newLine.insertCell(0);
    newCellKeyInput = document.createElement("input");
    newCellKey.appendChild(newCellKeyInput);
    newCellKeyInput.setAttribute("id", "stock_"+id+"_key")

    newCellValue = newLine.insertCell(1);
    newCellValueInput = document.createElement("input");
    newCellValue.appendChild(newCellValueInput);
    newCellValueInput.setAttribute("id", "stock_"+id+"_val")
}

function save_options() {
    data = {}
    count_input = 0
    while(count_input >= 0) {
        element_key = document.getElementById('stock_'+count_input+'_key');
        element_value = document.getElementById('stock_'+count_input+'_val');
        if (element_key == null) {
            count_input = -1;
            break;
        } else if(element_value.value == "") {
            count_input = -1;
            break;
        }
        data[element_key.value] = element_value.value;
        count_input = count_input+1;
    }

    chrome.storage.sync.set({
        stockExchange: data
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
  
function restore_options() {
    chrome.storage.sync.get({
        stockExchange: {}
    }, function(items) {
        stockEchangeLength = Object.keys(items["stockExchange"]).length
        for (const [index, [stock_name, stock_value]] of Object.entries(Object.entries(items["stockExchange"]))) {
            if (document.getElementById('stock_'+index+'_key') == null) {
                add_table_row_empty(index)
            }
            document.getElementById('stock_'+index+'_key').value = stock_name;
            document.getElementById('stock_'+index+'_val').value = stock_value;
        }
    });
}


function add_table_value() {
    currentInputs = document.getElementsByTagName("input")
    nextInputId = currentInputs.length/2

    add_table_row_empty(nextInputId)
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add').addEventListener('click', add_table_value);
