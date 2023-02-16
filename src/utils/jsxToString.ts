export function jsxToString(element?: string | JSX.Element): string {
    if (!element) {
        return '';
    }

    if (typeof element === 'string') {
        return element;
    }

    if (typeof element === 'number') {
        return String(element);
    }

    if (Array.isArray(element)) {
        return element.map((subElement) => jsxToString(subElement)).join('');
    }

    if (element.props && element.props.children) {
        return jsxToString(element.props.children);
    }

    if (element.props && !element.props.children) {
        return '';
    }

    return '';
}
