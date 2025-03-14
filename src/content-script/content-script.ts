import { TabMessageEvent } from '~/types';

chrome.runtime.sendMessage(TabMessageEvent.LOAD_PAGE);
