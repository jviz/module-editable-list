//Display the element on the list
jviz.modules.editableList.prototype.display = function(el, index, edit)
{
  //Check for edit mode
  if(typeof edit === 'undefined'){ var edit = false; }

  //Save this
  var self = this;

  //Get the table id
  var id_row = this._row.id + '-' + index;

  //Clear the row
  jviz.dom.html(id_row, '');

  //Check the info column
  if(this._columns.info.active === true)
  {
    //Get the info cell id
    var id_info = this._cell.id + '-' + index + '-info';

    //Get the title
    var title = (typeof this._columns.info.title == 'function') ? this._columns.info.title(el, index) : this._columns.info.title;

    //Get the detail
    var detail = (typeof this._columns.info.detail == 'function') ? this._columns.info.detail(el, index) : this._columns.info.detail;

    //Check for empty title
    if(title !== '')
    {
      //Add the info cell
      jviz.dom.append(id_row, { id: id_info, class: this._cell.class });

      //Add the title
      jviz.dom.append(id_info, { class: this._text.title, _html: title });

      //Check for add the detail
      if(detail !== ''){ jviz.dom.append(id_info, { class: this._text.detail, _html: detail });  }
    }
  }

  //Read all the columns
  for(var i = 0; i < this._columns.src.length; i++)
  {
    //Get the column
    var col = this._columns.src[i];

    //Generate the cell id
    var id_cell = this._cell.id + '-' + index + '-' + i;

    //Generate the new cell
    jviz.dom.append(id_row, { id: id_cell, class: this._cell.class });

    //Check if is editable
    if(edit === true && col.editable === true)
    {
      //Get the input id
      var id_input = this._input.id + '-' + index + '-' + i;

      //Check for select input
      if(col.type === 'select')
      {
        //Add the select
        jviz.dom.append(id_cell, { _tag: 'select', id: id_input, class: this._input.class });

        //Add the options
        for(var j = 0; j < col.options.length; j++)
        {
          //Get the option
          var opt = col.options[j];

          //Append the option
          jviz.dom.append(id_input, { _tag: 'option', id: id_input + '-' + j, value: opt.value, _html: opt.name });
        }
      }
      else
      {
        //Add the input
        jviz.dom.append(id_cell, { _tag: 'input', type: col.type, id: id_input, class: this._input.class });
      }

      //Check the input helper
      if(col.helper !== '')
      {
        //Add the input helper
        jviz.dom.append(id_cell, { class: this._input.helper, _html: col.helper });
      }

      //Next
      continue;
    }

    //Get the cell value
    var cell_value = (typeof col.parse === 'function') ? col.parse(el, index, col.key, i) : el[col.key];

    //Get the cell detail
    var cell_detail = (typeof col.detail === 'function') ? col.detail(el, index, col.key, i) : col.detail;

    //Add the cell value
    jviz.dom.append(id_cell, { _tag: 'div', class: this._text.value, _html: cell_value });

    //Check the cell detail
    if(cell_detail !== ''){ jviz.dom.append(id_cell, { class: this._text.detail, _html: cell_detail }); }
  }

  //Check for editable
  if(this._editable === true)
  {
    //Buttons cell id
    var id_btn = this._cell.id + '-' + index + '-btn';

    //Add the button cell
    jviz.dom.append(id_row, { id: id_btn, class: this._cell.last });

    //Check the edit mode
    if(edit === true)
    {
      //Add the save button
      jviz.dom.append(id_btn, { id: this._btn.save.id + '-' + index, class: this._btn.save.class, title: this._btn.save.alt });

      //Add the cancel button
      jviz.dom.append(id_btn, { id: this._btn.cancel.id + '-' + index, class: this._btn.cancel.class, title: this._btn.cancel.alt });
    }
    else
    {
      //Add the edit button
      jviz.dom.append(id_btn, { id: this._btn.edit.id + '-' + index, class: this._btn.edit.class, title: this._btn.edit.alt });

      //Add the delete button
      jviz.dom.append(id_btn, { id: this._btn.delete.id + '-' + index, class: this._btn.delete.class, title: this._btn.delete.alt });
    }
  }

  //Check the edit mode
  if(edit === true)
  {
    //Read all the columns again
    for(var i = 0; i < this._columns.src.length; i++)
    {
      //Get the column
      var col = this._columns.src[i];

      //Check for editable
      if(col.editable === false){ continue; }

      //Get the input id
      var id_input = this._input.id + '-' + index + '-' + i;

      //Add the value
      document.getElementById(id_input).value = el[col.key];
    }
  }

  //Check for active
  if(this._data.active[index] === true){ return; }

  //Hide this row
  //$('#').css('display', 'none');
};
