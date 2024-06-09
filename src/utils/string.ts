// eslint-disable-next-line prettier/prettier
export { };

declare global {
    interface String {
        isEmpty(): boolean;
    }
}

String.prototype.isEmpty = function () {
    return !this || this.length === 0;
};