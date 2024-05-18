export function sanitizeInput(input: string) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}