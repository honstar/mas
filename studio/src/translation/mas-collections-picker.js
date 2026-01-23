import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { styles } from './mas-collections-picker.css.js';
import Store from '../store.js';
import StoreController from '../reactivity/store-controller.js';
import { MODEL_WEB_COMPONENT_MAPPING, getFragmentPartsToUse } from '../editor-panel.js';
import { ROOT_PATH, TAG_MODEL_ID_MAPPING } from '../constants.js';
import { showToast } from '../utils.js';
import { Fragment } from '../aem/fragment.js';
import './mas-selected-items.js';

class MasCollectionsPicker extends LitElement {
    static styles = styles;

    constructor() {
        super();
        this.columnsToShow = new Set([
            { label: 'Collection Title', key: 'title', sortable: true },
            { label: 'Fragments', key: 'items' },
            { label: 'Path', key: 'path' },
            { label: 'Status', key: 'status' },
        ]);
    }

    render() {
        return html`
            <div class="search">
                <sp-search size="m" placeholder="Search" disabled></sp-search>
                <div>1507 result(s)</div>
            </div>

            <div class="filters">
                <sp-picker disabled>
                    <span slot="label">Template</span>
                    <sp-menu-item>TODO</sp-menu-item>
                </sp-picker>

                <sp-picker disabled>
                    <span slot="label">Market Segment</span>
                    <sp-menu-item>TODO</sp-menu-item>
                </sp-picker>

                <sp-picker disabled>
                    <span slot="label">Customer Segment</span>
                    <sp-menu-item>TODO</sp-menu-item>
                </sp-picker>

                <sp-picker disabled>
                    <span slot="label">Product</span>
                    <sp-menu-item>TODO</sp-menu-item>
                </sp-picker>
            </div>
            <div class="container">
                <mas-select-fragments-table
                    .type=${'collections'}
                    .columnsToShow=${this.columnsToShow}
                    .itemToRemove=${this.itemToRemove}
                ></mas-select-fragments-table>
                <mas-selected-items .type=${'fragments'} @remove=${this.setItemToRemove}></mas-selected-items>
            </div>
        `;
    }
}

customElements.define('mas-collections-picker', MasCollectionsPicker);
