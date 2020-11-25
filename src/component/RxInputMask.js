import React, {Component} from 'react'
import {RXInputMask} from "incr-regex-package";

const KEYCODE_Z = 90
const KEYCODE_Y = 89

function isUndo(e) {
    return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z)
}

function isRedo(e) {
    return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y)
}

function getSelection(el) {
    let start, end
    if (el.selectionStart !== undefined) {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        try {
            el.focus();
            let rangeEl = el.createTextRange();
            let clone = rangeEl.duplicate();
            rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
            clone.setEndPoint('EndToStart', rangeEl);
            start = clone.text.length;
            end = start + rangeEl.text.length;
        } catch (e) { /* not focused or not visible */
        }
    }
    return {start, end}
}

function setSelection(el, selection) {
    try {
        if (el.selectionStart !== undefined) {
            el.focus();
            el.setSelectionRange(selection.start, selection.end);
        } else {
            el.focus()
            let rangeEl = el.createTextRange();
            rangeEl.collapse(true);
            rangeEl.moveStart('character', selection.start);
            rangeEl.moveEnd('character', selection.end - selection.start);
            rangeEl.select();
        }
    } catch (e) { /* not focused or not visible */
    }
}

function eqSel(sel1, sel2) {
    if (sel1 === sel2) return true;
    if (sel1 === undefined || sel2 === undefined) return false;
    return sel1.start === sel2.start && sel1.end === sel2.end;
}

export default class RxInputMask extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._onPaste = this._onPaste.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this.input = null;
    }

    getInitialState() {
        let options = {
            pattern: (this.props.mask || /.*/),
            value: (this.props.value || '')
        };
        return {
            focus: false,
            value: (this.props.value || ''),
            selection: this.props.selection,
            mask: new RXInputMask(options)
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.mask.toString() !== nextProps.mask.toString()) {
            this.state.mask.setPattern(nextProps.mask, {value: nextProps.value, selection: this.state.mask.selection});
            this.setState({selection: this.state.selection, value: nextProps.value});
        } else if (this.props.value !== nextProps.value) {
            this.state.mask.setValue(nextProps.value);
        }
    }

    _updateMaskSelection() {
        this.setState({selection: getSelection(this.input)});
    }

    _updateInputSelection() {
        if (this.input)
            if (!eqSel(getSelection(this.input), this.state.mask.selection)) setSelection(this.input, this.state.mask.selection);
    }

    _onFocus(e) {
        if (this.props.onFocus) this.props.onFocus(e);
    }

    _onBlur(e) {
        this.fireChange(e);
    }

    fireChange(e) {
        if (this.props.onChange) {
            let opt = {
                value: this.state.mask._getValue(),
                target: e.target,
                name: this.props.name,
                mask: this.state.mask
            };
            this.props.onChange({target: opt});
        }
    }

    _onChange(e) {
        const mask = this.state.mask;
        let maskValue = mask.getValue()
        if (e.target.value !== maskValue) {
            // Cut or delete operations will have shortened the value
            if (e.target.value.length < maskValue.length) {
                let sizeDiff = maskValue.length - e.target.value.length
                this._updateMaskSelection();
                mask.selection.end = mask.selection.start + sizeDiff
                mask.backspace();
            }
            let value = this._getDisplayValue();
            e.target.value = value
            if (value) {
                this._updateInputSelection()
            }
        }
        this.setState({selection: mask.selection});
        this.fireChange(e)
    }

    _onKeyDown(e) {
        const mask = this.state.mask;
        const isKey = (keyV) => (e) => e.key === keyV;

        const _C = (test, action) => {
            if (!test(e)) return false;
            e.preventDefault();
            this._updateMaskSelection();
            if (action()) {
                let oldVal = e.target.value
                let value = this._getDisplayValue();
                e.target.value = value;
                if (value) {
                    this._updateInputSelection();
                }
                if (this.props.onChange && oldVal !== value) {
                    this.fireChange(e);
                }
            }
            this.setState({selection: mask.selection});
            return true;
        };
        if (_C(isUndo, () => mask.undo()) || _C(isRedo, () => mask.redo()) ||
            _C(isKey("Backspace"), () => mask.backspace()) ||
            _C(isKey("Delete"), () => mask.del())) return;

        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.key === 'Enter' || e.key === 'Tab') {
            return
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            let sel = getSelection(this.input);
            if (sel.start === sel.end && mask.left !== undefined) {
                e.preventDefault();
                if (e.key === 'ArrowLeft') mask.left(sel);
                else mask.right(sel);
                this._updateInputSelection();
            }

        }
    }

    _onKeyPress(e) {
        const mask = this.state.mask;
        // Ignore modified key presses
        // Ignore enter key to allow form submission
        if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
            return
        }
        e.preventDefault();
        this._updateMaskSelection();

        if (insert(e.key)) {
            let oldVal = e.target.value;
            let value = mask.getValue();
            e.target.value = value;
            this._updateInputSelection();
            this.setState({selection: mask.selection});
            if (this.props.onChange && oldVal !== value) {
                let opt = {target: {value: mask._getValue()}};
                this.props.onChange(opt);
            }
        }

        function insert(ch) {
            if (mask.input(ch)) return true;
            if (ch !== ch.toUpperCase()) return mask.input(ch.toUpperCase());
            else if (ch !== ch.toLowerCase()) return mask.input(ch.toLowerCase());
            return false;
        }
    }

    _onPaste(e) {
        const mask = this.state.mask;
        e.preventDefault()
        this._updateMaskSelection()
        if (mask.paste(e.clipboardData.getData('Text'))) {
            e.target.value = mask.getValue();
            this._updateInputSelection();
            this.setState({selection: mask.selection});
        }
    }

    _getDisplayValue() {
        let value = this.state.mask.getValue()
        return value === this.state.mask.emptyValue ? '' : value
    }

    render() {
        let {mask, size, placeholder, popover, selection, showAll, ...props} = this.props;
        let patternLength = this.state.mask.pattern.length;

        const setRef = aDomElem => {
            this.input = aDomElem;
        }

        return (
            <input
                {...props}
                ref={setRef}
                maxLength={patternLength}
                onChange={this._onChange}
                onKeyDown={this._onKeyDown}
                onKeyPress={this._onKeyPress}
                onPaste={this._onPaste}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                placeholder={placeholder || this.state.mask.emptyValue}
                size={size || patternLength}
                value={this._getDisplayValue()}
            />
        );
    }
}