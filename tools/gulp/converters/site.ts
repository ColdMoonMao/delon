// tslint:disable
const JsonML = require('jsonml.js/lib/utils');
import { isHeading, generateSluggedId, genAttr } from '../utils/utils';

export function site() {
    return [
        [
            (node: any) => JsonML.isElement(node) && isHeading(node),
            (node: any, index: number) => {
                const tagName = JsonML.getTagName(node);
                const children = JsonML.getChildren(node);
                const sluggedId = generateSluggedId(children).id;
                // <a href="#${sluggedId}" class="anchor">#</a>
                return `<${tagName}><span>${children}</span><a class="anchor" href="#${sluggedId}">　</a></${tagName}>`;
            }
        ],
        [
            (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'a',
            (node: any, index: number) => {
                const attrs = Object.assign({ }, JsonML.getAttributes(node));
                return `<a target="_blank" href="${attrs.href}">${JsonML.getChildren(node)}</a>`;
            }
        ],
        [
            (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'img',
            (node: any, index: number) => {
                const attrs = JsonML.getAttributes(node);
                const ret: any[] = [];
                if (attrs) {
                    for (const key in attrs) {
                        let value = attrs[key];
                        if (key === 'src' && ~value.indexOf(' | ')) {
                            const imgWH = value.split(' | ')[1].trim().split('=');
                            for (let i = 0; i < imgWH.length; i += 2) {
                                ret.push(`${imgWH[i]}=${imgWH[i + 1]}`);
                            }
                            value = value.split(' | ')[0];
                        }
                        if (value) ret.push(`${key}="${value}"`);
                    }
                }
                return `<img ${ret.join(' ')} />`;
            }
        ]
    ];
}