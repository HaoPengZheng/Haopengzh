import React from 'react';
import UrlHelper from '@/utils/url'

import { version, Button } from "antd";

export default function () {
    let code = UrlHelper.getUrlParam('code')
    alert(code)
    return (
        <div >
            <div />

            <ul >
                <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
                <li>
                    <a href="https://umijs.org/guide/getting-started.html">
                        Getting Started
          </a>
                </li>
            </ul>
        </div>
    );
}
