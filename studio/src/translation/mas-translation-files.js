import { LitElement, html } from 'lit';
import { styles } from './mas-translation-files.css.js';
import Store from '../store.js';
import StoreController from '../reactivity/store-controller.js';
import NestedStoreController from '../reactivity/nested-store-controller.js';

import './mas-fragment-picker.js';
import './mas-collections-picker.js';

class MasTranslationFiles extends LitElement {
    static styles = styles;

    static properties = {
        selectedTab: { type: String, state: true },
    };

    constructor() {
        super();
        this.selectedTab = 'fragments';
        this.showSelectedStoreController = new StoreController(this, Store.translationProjects.showSelected);
        this.inEditController = new NestedStoreController(this, Store.translationProjects.inEdit);
    }

    get showSelected() {
        return Store.translationProjects.showSelected.value;
    }

    get selectedFilesCount() {
        return this.inEditController.value?.fields?.find((field) => field.name === 'items')?.values?.length;
    }

    #toggleShowSelected = () => {
        Store.translationProjects.showSelected.set(!this.showSelected);
    };

    #handleTabChange = (event) => {
        this.selectedTab = event.currentTarget.selected;
    };

    render() {
        return html`
            <sp-tabs quiet selected=${this.selectedTab} @change=${this.#handleTabChange}>
                <sp-tab value="fragments" label="Fragments">Fragments</sp-tab>
                <sp-tab value="collections" label="Collections">Collections</sp-tab>
                <sp-tab value="placeholders" label="Placeholders" disabled>Placeholders</sp-tab>

                <sp-tab-panel value="fragments">
                    ${this.selectedTab === 'fragments'
                        ? html`<mas-fragment-picker .type=${this.selectedTab}></mas-fragment-picker>`
                        : ''}
                </sp-tab-panel>
                <sp-tab-panel value="collections">
                    ${this.selectedTab === 'collections'
                        ? html`<mas-collections-picker .type=${this.selectedTab}></mas-collections-picker>`
                        : ''}
                </sp-tab-panel>
                <sp-tab-panel value="placeholders">
                    <mas-placeholder-picker></mas-placeholder-picker>
                </sp-tab-panel>
            </sp-tabs>
            <div class="selected-files-count">
                <sp-button variant="secondary" @click=${this.#toggleShowSelected} ?disabled=${!this.selectedFilesCount}>
                    <sp-icon-export
                        slot="icon"
                        label=${this.showSelected && this.selectedFilesCount ? 'Hide selection' : 'Selected items'}
                        class=${this.showSelected && this.selectedFilesCount ? 'flipped' : ''}
                    ></sp-icon-export>
                    ${this.showSelected && this.selectedFilesCount ? 'Hide selection' : 'Selected items'}
                    (${this.selectedFilesCount})
                </sp-button>
            </div>
        `;
    }
}

customElements.define('mas-translation-files', MasTranslationFiles);
