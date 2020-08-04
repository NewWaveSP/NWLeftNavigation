import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import { SPHttpClient, HttpClientResponse } from "@microsoft/sp-http";

import * as strings from 'LeftNavigationApplicationCustomizerStrings';
import { sp } from '@pnp/sp';
import * as $ from 'jquery';
require ('./css/external.css');

const LOG_SOURCE: string = 'LeftNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ILeftNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class LeftNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<ILeftNavigationApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
    private _linkItems = [];
  
    @override
    public onInit(): Promise<void> {
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
  
      sp.setup({
        spfxContext: this.context
      });
  
     /* $(document).ready(() => {
        // Wait 5 seconds and add toggle-button
        setTimeout(() => {
          if (!$("#toggleNavButton")[0]) {
  
            $('.ms-FocusZone > .ms-CommandBar-primaryCommand').eq(0).prepend(`
              <div class="ms-OverflowSet-item item-custom">
                <button
                  type="button"
                  role="menuitem"
                  name="Toggle Nav"
                  id="toggleNavButton"
                  class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-custom nav-opened"
                  data-is-focusable="true"
                  tabindex="0"
                >
                  <div class="ms-Button-flexContainer flexContainer-custom">
                    <i class="ms-Icon ms-Icon--GlobalNavButton icon-custom" aria-hidden="true"></i>
                    <div class="ms-Button-textContainer textContainer-custom">
                      <div class="ms-Button-label label-custom" id="id__130">Quick Launch</div>
                    </div>
                  </div>
                </button>
              </div>
            `);
  
            // add event listener for toggle button
            $("#toggleNavButton").click(function () {
              if ($(this).hasClass('nav-closed')) {
                $("div[class^='spNav_']").css({ 'margin-left': '0px' });
                $(".Files-leftNav").css({ 'margin-left': '0px' });
                $('.CanvasZone').css({
                  'max-width': '1268px'
                });
                $(this).removeClass('nav-closed');
                $(this).addClass('nav-opened');
              } else {
                $("div[class^='spNav_']").css({ 'margin-left': '-207px' });
                $(".Files-leftNav").css({ 'margin-left': '-207px' });
                $('.CanvasZone').css({
                  'max-width': 'none'
                });
                $(this).removeClass('nav-opened');
                $(this).addClass('nav-closed');
              }
            });
          }
  
          // move search box to the right
          let $parent = $(".ms-searchux-searchbox").parent().eq(0);
          $parent.addClass("custom-search-container");
        }, 3000);
      });
  */
      this.context.placeholderProvider.changedEvent.add(this, this._renderTopPlaceholder);
  
      return Promise.resolve();
    }
  
    private _renderTopPlaceholder(): void {
      if (!this._topPlaceholder) {
        this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose }
        );
  
        if (!this._topPlaceholder) {
          console.error('The expected placeholder (Top) was not found.');
          return;
        }
      }
  
      if (this._topPlaceholder.domElement) {
        require('./css/factor.module.scss');
      }
    }
  
    private _onDispose(): void {
      console.log('[LeftNavigationApplicationCustomizer._onDispose] Disposed custom top placeholder.');
    }
  }
