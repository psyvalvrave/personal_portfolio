//cypress/support/commands.js
Cypress.Commands.add("injectRecaptchaToken", () => {
    cy.window({ log: false }).then((win) => {
        function findAndSetTokenFiber() {
        const hook = win.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!hook || !hook.rendererInterfaces) {
            setTimeout(findAndSetTokenFiber, 100);
            return;
        }

        hook.rendererInterfaces.forEach((renderer) => {
            renderer.getFiberRoots(renderer.rendererID).forEach((root) => {
            function walk(fiber) {
                if (!fiber) return;
                if (
                fiber.elementType &&
                fiber.elementType.name === "ContactForm"
                ) {
                let stateHook = fiber.memoizedState;
                if (stateHook && stateHook.next) {
                    const recaptchaHook = stateHook.next.next;
                    const setRecaptchaToken = recaptchaHook.memoizedState.queue.dispatch;
                    setRecaptchaToken("FAKE_RECAPTCHA_TOKEN");
                    return true;
                }
                }
                return walk(fiber.child) || walk(fiber.sibling);
            }

            walk(root.current);
            });
        });
        }

        findAndSetTokenFiber();
    });
});
