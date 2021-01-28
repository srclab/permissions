/**
 * Get select options.
 *
 * @param {Immutable.List} options
 * @return {object[]}
 */
export function getSelectOptions(options) {

    if(!options) {
        return [];
    }

    let result = [];

    options.forEach((option, key) => {
        result.push({label: option, value: key});
    });

    return result;
}

/**
 * Get selected value for select component.
 *
 * @param {string} selected_value
 * @param {object[]} select_options
 * @return {object|null}
 */
export function getSelectedValue(selected_value, select_options) {

    let selectedValue = select_options.filter((option) => {
        return ''+option.value === ''+selected_value
    });

    if (selectedValue.length === 0) {
        return null;
    } else {
        return selectedValue.pop()
    }

}