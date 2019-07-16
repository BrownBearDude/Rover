export const File: any;
export class OptionManager {
    static createBareOptions(): any;
    static memoisePluginContainer(fn: any, loc: any, i: any, alias: any): any;
    static memoisedPlugins: any[];
    static normalisePlugin(plugin: any, loc: any, i: any, alias: any): any;
    static normalisePlugins(loc: any, dirname: any, plugins: any): any;
    constructor(log: any);
    resolvedConfigs: any;
    options: any;
    log: any;
    init(...args: any[]): any;
    mergeOptions(_ref2: any): void;
    mergePresets(presets: any, dirname: any): void;
    normaliseOptions(): void;
    resolvePresets(presets: any, dirname: any, onResolve: any): any;
}
export class Pipeline {
    analyse(code: any, ...args: any[]): any;
    lint(code: any, ...args: any[]): any;
    pretransform(code: any, opts: any): any;
    transform(code: any, opts: any): any;
    transformFromAst(ast: any, code: any, opts: any): any;
}
export function Plugin(alias: any): void;
export function analyse(p0: any): any;
export const buildExternalHelpers: any;
export namespace messages {
    const MESSAGES: {
        classesIllegalBareSuper: string;
        classesIllegalSuperCall: string;
        codeGeneratorDeopt: string;
        didYouMean: string;
        expectedMemberExpressionOrIdentifier: string;
        illegalMethodName: string;
        invalidParentForThisNode: string;
        lostTrackNodePath: string;
        missingTemplatesDirectory: string;
        modulesDuplicateDeclarations: string;
        modulesIllegalExportName: string;
        noAssignmentsInForHead: string;
        pluginInvalidProperty: string;
        pluginNotFunction: string;
        pluginNotObject: string;
        pluginUnknown: string;
        readOnly: string;
        scopeDuplicateDeclaration: string;
        settersNoRest: string;
        tailCallReassignmentDeopt: string;
        traverseNeedsParent: string;
        traverseVerifyNodeType: string;
        traverseVerifyRootFunction: string;
        traverseVerifyVisitorProperty: string;
        undeclaredVariable: string;
        undeclaredVariableSuggestion: string;
        undeclaredVariableType: string;
        unknownForHead: string;
        unsupportedOutputType: string;
    };
    function get(key: any, ...args: any[]): any;
    function parseArgs(args: any): any;
}
export const options: any;
export const resolvePlugin: any;
export const resolvePreset: any;
export const template: any;
export function transform(p0: any, p1: any): any;
export function transformFile(filename: any, opts: any, callback: any): void;
export function transformFileSync(filename: any, ...args: any[]): any;
export function transformFromAst(p0: any, p1: any, p2: any): any;
export function traverse(parent: any, opts: any, scope: any, state: any, parentPath: any): void;
export namespace traverse {
    class Hub {
        constructor(file: any, options: any);
        file: any;
        options: any;
    }
    class NodePath {
        static get(_ref: any): any;
        constructor(hub: any, parent: any);
        parent: any;
        hub: any;
        contexts: any;
        data: any;
        shouldSkip: any;
        shouldStop: any;
        removed: any;
        state: any;
        opts: any;
        skipKeys: any;
        parentPath: any;
        context: any;
        container: any;
        listKey: any;
        inList: any;
        parentKey: any;
        key: any;
        node: any;
        scope: any;
        type: any;
        typeAnnotation: any;
        addComment(type: any, content: any, line: any): void;
        addComments(type: any, comments: any): void;
        arrowFunctionToShadowed(): void;
        assertAnyTypeAnnotation(opts: any): void;
        assertArrayExpression(opts: any): void;
        assertArrayPattern(opts: any): void;
        assertArrayTypeAnnotation(opts: any): void;
        assertArrowFunctionExpression(opts: any): void;
        assertAssignmentExpression(opts: any): void;
        assertAssignmentPattern(opts: any): void;
        assertAwaitExpression(opts: any): void;
        assertBinary(opts: any): void;
        assertBinaryExpression(opts: any): void;
        assertBindExpression(opts: any): void;
        assertBlock(opts: any): void;
        assertBlockParent(opts: any): void;
        assertBlockStatement(opts: any): void;
        assertBooleanLiteral(opts: any): void;
        assertBooleanLiteralTypeAnnotation(opts: any): void;
        assertBooleanTypeAnnotation(opts: any): void;
        assertBreakStatement(opts: any): void;
        assertCallExpression(opts: any): void;
        assertCatchClause(opts: any): void;
        assertClass(opts: any): void;
        assertClassBody(opts: any): void;
        assertClassDeclaration(opts: any): void;
        assertClassExpression(opts: any): void;
        assertClassImplements(opts: any): void;
        assertClassMethod(opts: any): void;
        assertClassProperty(opts: any): void;
        assertCompletionStatement(opts: any): void;
        assertConditional(opts: any): void;
        assertConditionalExpression(opts: any): void;
        assertContinueStatement(opts: any): void;
        assertDebuggerStatement(opts: any): void;
        assertDeclaration(opts: any): void;
        assertDeclareClass(opts: any): void;
        assertDeclareExportDeclaration(opts: any): void;
        assertDeclareFunction(opts: any): void;
        assertDeclareInterface(opts: any): void;
        assertDeclareModule(opts: any): void;
        assertDeclareModuleExports(opts: any): void;
        assertDeclareOpaqueType(opts: any): void;
        assertDeclareTypeAlias(opts: any): void;
        assertDeclareVariable(opts: any): void;
        assertDecorator(opts: any): void;
        assertDirective(opts: any): void;
        assertDirectiveLiteral(opts: any): void;
        assertDoExpression(opts: any): void;
        assertDoWhileStatement(opts: any): void;
        assertEmptyStatement(opts: any): void;
        assertEmptyTypeAnnotation(opts: any): void;
        assertExistentialTypeParam(opts: any): void;
        assertExportAllDeclaration(opts: any): void;
        assertExportDeclaration(opts: any): void;
        assertExportDefaultDeclaration(opts: any): void;
        assertExportDefaultSpecifier(opts: any): void;
        assertExportNamedDeclaration(opts: any): void;
        assertExportNamespaceSpecifier(opts: any): void;
        assertExportSpecifier(opts: any): void;
        assertExpression(opts: any): void;
        assertExpressionStatement(opts: any): void;
        assertExpressionWrapper(opts: any): void;
        assertFile(opts: any): void;
        assertFlow(opts: any): void;
        assertFlowBaseAnnotation(opts: any): void;
        assertFlowDeclaration(opts: any): void;
        assertFor(opts: any): void;
        assertForAwaitStatement(opts: any): void;
        assertForInStatement(opts: any): void;
        assertForOfStatement(opts: any): void;
        assertForStatement(opts: any): void;
        assertForXStatement(opts: any): void;
        assertFunction(opts: any): void;
        assertFunctionDeclaration(opts: any): void;
        assertFunctionExpression(opts: any): void;
        assertFunctionParent(opts: any): void;
        assertFunctionTypeAnnotation(opts: any): void;
        assertFunctionTypeParam(opts: any): void;
        assertGenericTypeAnnotation(opts: any): void;
        assertIdentifier(opts: any): void;
        assertIfStatement(opts: any): void;
        assertImmutable(opts: any): void;
        assertImport(opts: any): void;
        assertImportDeclaration(opts: any): void;
        assertImportDefaultSpecifier(opts: any): void;
        assertImportNamespaceSpecifier(opts: any): void;
        assertImportSpecifier(opts: any): void;
        assertInterfaceDeclaration(opts: any): void;
        assertInterfaceExtends(opts: any): void;
        assertIntersectionTypeAnnotation(opts: any): void;
        assertJSX(opts: any): void;
        assertJSXAttribute(opts: any): void;
        assertJSXClosingElement(opts: any): void;
        assertJSXElement(opts: any): void;
        assertJSXEmptyExpression(opts: any): void;
        assertJSXExpressionContainer(opts: any): void;
        assertJSXIdentifier(opts: any): void;
        assertJSXMemberExpression(opts: any): void;
        assertJSXNamespacedName(opts: any): void;
        assertJSXOpeningElement(opts: any): void;
        assertJSXSpreadAttribute(opts: any): void;
        assertJSXSpreadChild(opts: any): void;
        assertJSXText(opts: any): void;
        assertLVal(opts: any): void;
        assertLabeledStatement(opts: any): void;
        assertLiteral(opts: any): void;
        assertLogicalExpression(opts: any): void;
        assertLoop(opts: any): void;
        assertMemberExpression(opts: any): void;
        assertMetaProperty(opts: any): void;
        assertMethod(opts: any): void;
        assertMixedTypeAnnotation(opts: any): void;
        assertModuleDeclaration(opts: any): void;
        assertModuleSpecifier(opts: any): void;
        assertNewExpression(opts: any): void;
        assertNoop(opts: any): void;
        assertNullLiteral(opts: any): void;
        assertNullLiteralTypeAnnotation(opts: any): void;
        assertNullableTypeAnnotation(opts: any): void;
        assertNumberLiteral(opts: any): void;
        assertNumberTypeAnnotation(opts: any): void;
        assertNumericLiteral(opts: any): void;
        assertNumericLiteralTypeAnnotation(opts: any): void;
        assertObjectExpression(opts: any): void;
        assertObjectMember(opts: any): void;
        assertObjectMethod(opts: any): void;
        assertObjectPattern(opts: any): void;
        assertObjectProperty(opts: any): void;
        assertObjectTypeAnnotation(opts: any): void;
        assertObjectTypeCallProperty(opts: any): void;
        assertObjectTypeIndexer(opts: any): void;
        assertObjectTypeProperty(opts: any): void;
        assertObjectTypeSpreadProperty(opts: any): void;
        assertOpaqueType(opts: any): void;
        assertParenthesizedExpression(opts: any): void;
        assertPattern(opts: any): void;
        assertProgram(opts: any): void;
        assertProperty(opts: any): void;
        assertPureish(opts: any): void;
        assertQualifiedTypeIdentifier(opts: any): void;
        assertRegExpLiteral(opts: any): void;
        assertRegexLiteral(opts: any): void;
        assertRestElement(opts: any): void;
        assertRestProperty(opts: any): void;
        assertReturnStatement(opts: any): void;
        assertScopable(opts: any): void;
        assertSequenceExpression(opts: any): void;
        assertSpreadElement(opts: any): void;
        assertSpreadProperty(opts: any): void;
        assertStatement(opts: any): void;
        assertStringLiteral(opts: any): void;
        assertStringLiteralTypeAnnotation(opts: any): void;
        assertStringTypeAnnotation(opts: any): void;
        assertSuper(opts: any): void;
        assertSwitchCase(opts: any): void;
        assertSwitchStatement(opts: any): void;
        assertTaggedTemplateExpression(opts: any): void;
        assertTemplateElement(opts: any): void;
        assertTemplateLiteral(opts: any): void;
        assertTerminatorless(opts: any): void;
        assertThisExpression(opts: any): void;
        assertThisTypeAnnotation(opts: any): void;
        assertThrowStatement(opts: any): void;
        assertTryStatement(opts: any): void;
        assertTupleTypeAnnotation(opts: any): void;
        assertTypeAlias(opts: any): void;
        assertTypeAnnotation(opts: any): void;
        assertTypeCastExpression(opts: any): void;
        assertTypeParameter(opts: any): void;
        assertTypeParameterDeclaration(opts: any): void;
        assertTypeParameterInstantiation(opts: any): void;
        assertTypeofTypeAnnotation(opts: any): void;
        assertUnaryExpression(opts: any): void;
        assertUnaryLike(opts: any): void;
        assertUnionTypeAnnotation(opts: any): void;
        assertUpdateExpression(opts: any): void;
        assertUserWhitespacable(opts: any): void;
        assertVariableDeclaration(opts: any): void;
        assertVariableDeclarator(opts: any): void;
        assertVoidTypeAnnotation(opts: any): void;
        assertWhile(opts: any): void;
        assertWhileStatement(opts: any): void;
        assertWithStatement(opts: any): void;
        assertYieldExpression(opts: any): void;
        baseTypeStrictlyMatches(right: any): any;
        buildCodeFrameError(msg: any, ...args: any[]): any;
        call(key: any): any;
        canHaveVariableDeclarationOrExpression(): any;
        canSwapBetweenExpressionAndStatement(replacement: any): any;
        couldBeBaseType(name: any): any;
        debug(buildMessage: any): void;
        ensureBlock(): any;
        equals(key: any, value: any): any;
        evaluate(): any;
        evaluateTruthy(): any;
        find(callback: any): any;
        findParent(callback: any): any;
        get(key: any, context: any): any;
        getAllNextSiblings(): any;
        getAllPrevSiblings(): any;
        getAncestry(): any;
        getBindingIdentifierPaths(...args: any[]): any;
        getBindingIdentifiers(duplicates: any): any;
        getCompletionRecords(): any;
        getData(key: any, def: any): any;
        getDeepestCommonAncestorFrom(paths: any, filter: any): any;
        getEarliestCommonAncestorFrom(paths: any): any;
        getFunctionParent(): any;
        getNextSibling(): any;
        getOpposite(): any;
        getOuterBindingIdentifierPaths(duplicates: any): any;
        getOuterBindingIdentifiers(duplicates: any): any;
        getPathLocation(): any;
        getPrevSibling(): any;
        getScope(scope: any): any;
        getSibling(key: any): any;
        getSource(): any;
        getStatementParent(): any;
        getTypeAnnotation(): any;
        has(key: any): any;
        hoist(...args: any[]): any;
        inShadow(key: any): any;
        inType(...args: any[]): any;
        insertAfter(nodes: any): any;
        insertBefore(nodes: any): any;
        is(key: any): any;
        isAncestor(maybeDescendant: any): any;
        isAnyTypeAnnotation(opts: any): any;
        isArrayExpression(opts: any): any;
        isArrayPattern(opts: any): any;
        isArrayTypeAnnotation(opts: any): any;
        isArrowFunctionExpression(opts: any): any;
        isAssignmentExpression(opts: any): any;
        isAssignmentPattern(opts: any): any;
        isAwaitExpression(opts: any): any;
        isBaseType(baseName: any, soft: any): any;
        isBinary(opts: any): any;
        isBinaryExpression(opts: any): any;
        isBindExpression(opts: any): any;
        isBindingIdentifier(opts: any): any;
        isBlacklisted(): any;
        isBlock(opts: any): any;
        isBlockParent(opts: any): any;
        isBlockScoped(opts: any): any;
        isBlockStatement(opts: any): any;
        isBooleanLiteral(opts: any): any;
        isBooleanLiteralTypeAnnotation(opts: any): any;
        isBooleanTypeAnnotation(opts: any): any;
        isBreakStatement(opts: any): any;
        isCallExpression(opts: any): any;
        isCatchClause(opts: any): any;
        isClass(opts: any): any;
        isClassBody(opts: any): any;
        isClassDeclaration(opts: any): any;
        isClassExpression(opts: any): any;
        isClassImplements(opts: any): any;
        isClassMethod(opts: any): any;
        isClassProperty(opts: any): any;
        isCompletionRecord(allowInsideFunction: any): any;
        isCompletionStatement(opts: any): any;
        isConditional(opts: any): any;
        isConditionalExpression(opts: any): any;
        isContinueStatement(opts: any): any;
        isDebuggerStatement(opts: any): any;
        isDeclaration(opts: any): any;
        isDeclareClass(opts: any): any;
        isDeclareExportDeclaration(opts: any): any;
        isDeclareFunction(opts: any): any;
        isDeclareInterface(opts: any): any;
        isDeclareModule(opts: any): any;
        isDeclareModuleExports(opts: any): any;
        isDeclareOpaqueType(opts: any): any;
        isDeclareTypeAlias(opts: any): any;
        isDeclareVariable(opts: any): any;
        isDecorator(opts: any): any;
        isDescendant(maybeAncestor: any): any;
        isDirective(opts: any): any;
        isDirectiveLiteral(opts: any): any;
        isDoExpression(opts: any): any;
        isDoWhileStatement(opts: any): any;
        isEmptyStatement(opts: any): any;
        isEmptyTypeAnnotation(opts: any): any;
        isExistentialTypeParam(opts: any): any;
        isExportAllDeclaration(opts: any): any;
        isExportDeclaration(opts: any): any;
        isExportDefaultDeclaration(opts: any): any;
        isExportDefaultSpecifier(opts: any): any;
        isExportNamedDeclaration(opts: any): any;
        isExportNamespaceSpecifier(opts: any): any;
        isExportSpecifier(opts: any): any;
        isExpression(opts: any): any;
        isExpressionStatement(opts: any): any;
        isExpressionWrapper(opts: any): any;
        isFile(opts: any): any;
        isFlow(opts: any): any;
        isFlowBaseAnnotation(opts: any): any;
        isFlowDeclaration(opts: any): any;
        isFor(opts: any): any;
        isForAwaitStatement(opts: any): any;
        isForInStatement(opts: any): any;
        isForOfStatement(opts: any): any;
        isForStatement(opts: any): any;
        isForXStatement(opts: any): any;
        isFunction(opts: any): any;
        isFunctionDeclaration(opts: any): any;
        isFunctionExpression(opts: any): any;
        isFunctionParent(opts: any): any;
        isFunctionTypeAnnotation(opts: any): any;
        isFunctionTypeParam(opts: any): any;
        isGenerated(opts: any): any;
        isGenericType(genericName: any): any;
        isGenericTypeAnnotation(opts: any): any;
        isIdentifier(opts: any): any;
        isIfStatement(opts: any): any;
        isImmutable(opts: any): any;
        isImport(opts: any): any;
        isImportDeclaration(opts: any): any;
        isImportDefaultSpecifier(opts: any): any;
        isImportNamespaceSpecifier(opts: any): any;
        isImportSpecifier(opts: any): any;
        isInterfaceDeclaration(opts: any): any;
        isInterfaceExtends(opts: any): any;
        isIntersectionTypeAnnotation(opts: any): any;
        isJSX(opts: any): any;
        isJSXAttribute(opts: any): any;
        isJSXClosingElement(opts: any): any;
        isJSXElement(opts: any): any;
        isJSXEmptyExpression(opts: any): any;
        isJSXExpressionContainer(opts: any): any;
        isJSXIdentifier(opts: any): any;
        isJSXMemberExpression(opts: any): any;
        isJSXNamespacedName(opts: any): any;
        isJSXOpeningElement(opts: any): any;
        isJSXSpreadAttribute(opts: any): any;
        isJSXSpreadChild(opts: any): any;
        isJSXText(opts: any): any;
        isLVal(opts: any): any;
        isLabeledStatement(opts: any): any;
        isLiteral(opts: any): any;
        isLogicalExpression(opts: any): any;
        isLoop(opts: any): any;
        isMemberExpression(opts: any): any;
        isMetaProperty(opts: any): any;
        isMethod(opts: any): any;
        isMixedTypeAnnotation(opts: any): any;
        isModuleDeclaration(opts: any): any;
        isModuleSpecifier(opts: any): any;
        isNewExpression(opts: any): any;
        isNodeType(type: any): any;
        isNoop(opts: any): any;
        isNullLiteral(opts: any): any;
        isNullLiteralTypeAnnotation(opts: any): any;
        isNullableTypeAnnotation(opts: any): any;
        isNumberLiteral(opts: any): any;
        isNumberTypeAnnotation(opts: any): any;
        isNumericLiteral(opts: any): any;
        isNumericLiteralTypeAnnotation(opts: any): any;
        isObjectExpression(opts: any): any;
        isObjectMember(opts: any): any;
        isObjectMethod(opts: any): any;
        isObjectPattern(opts: any): any;
        isObjectProperty(opts: any): any;
        isObjectTypeAnnotation(opts: any): any;
        isObjectTypeCallProperty(opts: any): any;
        isObjectTypeIndexer(opts: any): any;
        isObjectTypeProperty(opts: any): any;
        isObjectTypeSpreadProperty(opts: any): any;
        isOpaqueType(opts: any): any;
        isParenthesizedExpression(opts: any): any;
        isPattern(opts: any): any;
        isProgram(opts: any): any;
        isProperty(opts: any): any;
        isPure(opts: any): any;
        isPureish(opts: any): any;
        isQualifiedTypeIdentifier(opts: any): any;
        isReferenced(opts: any): any;
        isReferencedIdentifier(opts: any): any;
        isReferencedMemberExpression(opts: any): any;
        isRegExpLiteral(opts: any): any;
        isRegexLiteral(opts: any): any;
        isRestElement(opts: any): any;
        isRestProperty(opts: any): any;
        isReturnStatement(opts: any): any;
        isScopable(opts: any): any;
        isScope(opts: any): any;
        isSequenceExpression(opts: any): any;
        isSpreadElement(opts: any): any;
        isSpreadProperty(opts: any): any;
        isStatement(opts: any): any;
        isStatementOrBlock(): any;
        isStatic(): any;
        isStringLiteral(opts: any): any;
        isStringLiteralTypeAnnotation(opts: any): any;
        isStringTypeAnnotation(opts: any): any;
        isSuper(opts: any): any;
        isSwitchCase(opts: any): any;
        isSwitchStatement(opts: any): any;
        isTaggedTemplateExpression(opts: any): any;
        isTemplateElement(opts: any): any;
        isTemplateLiteral(opts: any): any;
        isTerminatorless(opts: any): any;
        isThisExpression(opts: any): any;
        isThisTypeAnnotation(opts: any): any;
        isThrowStatement(opts: any): any;
        isTryStatement(opts: any): any;
        isTupleTypeAnnotation(opts: any): any;
        isTypeAlias(opts: any): any;
        isTypeAnnotation(opts: any): any;
        isTypeCastExpression(opts: any): any;
        isTypeParameter(opts: any): any;
        isTypeParameterDeclaration(opts: any): any;
        isTypeParameterInstantiation(opts: any): any;
        isTypeofTypeAnnotation(opts: any): any;
        isUnaryExpression(opts: any): any;
        isUnaryLike(opts: any): any;
        isUnionTypeAnnotation(opts: any): any;
        isUpdateExpression(opts: any): any;
        isUser(opts: any): any;
        isUserWhitespacable(opts: any): any;
        isVar(opts: any): any;
        isVariableDeclaration(opts: any): any;
        isVariableDeclarator(opts: any): any;
        isVoidTypeAnnotation(opts: any): any;
        isWhile(opts: any): any;
        isWhileStatement(opts: any): any;
        isWithStatement(opts: any): any;
        isYieldExpression(opts: any): any;
        isnt(key: any): any;
        mark(type: any, message: any): void;
        matchesPattern(pattern: any, allowPartial: any): any;
        popContext(): void;
        pushContainer(listKey: any, nodes: any): any;
        pushContext(context: any): void;
        referencesImport(moduleSource: any, importName: any): any;
        remove(): void;
        replaceExpressionWithStatements(nodes: any): any;
        replaceInline(nodes: any): any;
        replaceWith(replacement: any): any;
        replaceWithMultiple(nodes: any): void;
        replaceWithSourceString(replacement: any): any;
        requeue(...args: any[]): void;
        resolve(dangerous: any, resolved: any): any;
        resync(): void;
        set(key: any, node: any): void;
        setContext(context: any): any;
        setData(key: any, val: any): any;
        setKey(key: any): void;
        setScope(): void;
        setup(parentPath: any, container: any, listKey: any, key: any): void;
        shareCommentsWithSiblings(): void;
        skip(): void;
        skipKey(key: any): void;
        stop(): void;
        toComputedKey(): any;
        traverse(visitor: any, state: any): void;
        unshiftContainer(listKey: any, nodes: any): any;
        updateSiblingKeys(fromIndex: any, incrementBy: any): void;
        visit(): any;
        willIMaybeExecuteBefore(target: any): any;
    }
    class Scope {
        static contextVariables: string[];
        static globals: string[];
        constructor(path: any, parentScope: any);
        uid: any;
        parent: any;
        hub: any;
        parentBlock: any;
        block: any;
        path: any;
        labels: any;
        addGlobal(node: any): void;
        bindingIdentifierEquals(name: any, node: any): any;
        buildUndefinedNode(): any;
        checkBlockScopedCollisions(local: any, kind: any, name: any, id: any): void;
        crawl(): void;
        dump(): void;
        generateDeclaredUidIdentifier(...args: any[]): any;
        generateUid(...args: any[]): any;
        generateUidIdentifier(...args: any[]): any;
        generateUidIdentifierBasedOnNode(parent: any, defaultName: any): any;
        getAllBindings(): any;
        getAllBindingsOfKind(...args: any[]): any;
        getBinding(name: any): any;
        getBindingIdentifier(name: any): any;
        getBlockParent(): any;
        getData(key: any): any;
        getFunctionParent(): any;
        getLabel(name: any): any;
        getOwnBinding(name: any): any;
        getOwnBindingIdentifier(name: any): any;
        getProgramParent(): any;
        hasBinding(name: any, noGlobals: any): any;
        hasGlobal(name: any): any;
        hasLabel(name: any): any;
        hasOwnBinding(name: any): any;
        hasReference(name: any): any;
        hasUid(name: any): any;
        init(): void;
        isPure(node: any, constantsOnly: any): any;
        isStatic(node: any): any;
        maybeGenerateMemoised(node: any, dontPush: any): any;
        moveBindingTo(name: any, scope: any): void;
        parentHasBinding(name: any, noGlobals: any): any;
        push(opts: any): void;
        registerBinding(kind: any, path: any, ...args: any[]): void;
        registerConstantViolation(path: any): void;
        registerDeclaration(path: any): void;
        registerLabel(path: any): void;
        removeBinding(name: any): void;
        removeData(key: any): void;
        removeOwnBinding(name: any): void;
        rename(oldName: any, newName: any, block: any): any;
        setData(key: any, val: any): any;
        toArray(node: any, i: any): any;
        traverse(node: any, opts: any, state: any): void;
        warnOnFlowBinding(binding: any): any;
    }
    function cheap(node: any, enter: any): any;
    function clearCache(): void;
    namespace clearCache {
        function clearPath(): void;
        function clearScope(): void;
    }
    function clearNode(node: any, opts: any): void;
    function copyCache(source: any, destination: any): void;
    function explode(visitor: any): any;
    function hasType(tree: any, scope: any, type: any, blacklistTypes: any): any;
    function node(node: any, opts: any, scope: any, state: any, parentPath: any, skipKeys: any): void;
    function removeProperties(tree: any, opts: any): any;
    function verify(visitor: any): void;
    namespace visitors {
        function explode(visitor: any): any;
        function merge(visitors: any, ...args: any[]): any;
        function verify(visitor: any): void;
    }
}
export namespace types {
    const ALIAS_KEYS: {
        AnyTypeAnnotation: string[];
        ArrayExpression: string[];
        ArrayPattern: string[];
        ArrayTypeAnnotation: string[];
        ArrowFunctionExpression: string[];
        AssignmentExpression: string[];
        AssignmentPattern: string[];
        AwaitExpression: string[];
        BinaryExpression: string[];
        BindExpression: string[];
        BlockStatement: string[];
        BooleanLiteral: string[];
        BooleanLiteralTypeAnnotation: string[];
        BooleanTypeAnnotation: string[];
        BreakStatement: string[];
        CallExpression: string[];
        CatchClause: string[];
        ClassBody: any[];
        ClassDeclaration: string[];
        ClassExpression: string[];
        ClassImplements: string[];
        ClassMethod: string[];
        ClassProperty: string[];
        ConditionalExpression: string[];
        ContinueStatement: string[];
        DebuggerStatement: string[];
        DeclareClass: string[];
        DeclareExportDeclaration: string[];
        DeclareFunction: string[];
        DeclareInterface: string[];
        DeclareModule: string[];
        DeclareModuleExports: string[];
        DeclareOpaqueType: string[];
        DeclareTypeAlias: string[];
        DeclareVariable: string[];
        Decorator: any[];
        Directive: any[];
        DirectiveLiteral: any[];
        DoExpression: string[];
        DoWhileStatement: string[];
        EmptyStatement: string[];
        EmptyTypeAnnotation: string[];
        ExistentialTypeParam: string[];
        ExportAllDeclaration: string[];
        ExportDefaultDeclaration: string[];
        ExportDefaultSpecifier: string[];
        ExportNamedDeclaration: string[];
        ExportNamespaceSpecifier: string[];
        ExportSpecifier: string[];
        ExpressionStatement: string[];
        File: any[];
        ForAwaitStatement: string[];
        ForInStatement: string[];
        ForOfStatement: string[];
        ForStatement: string[];
        FunctionDeclaration: string[];
        FunctionExpression: string[];
        FunctionTypeAnnotation: string[];
        FunctionTypeParam: string[];
        GenericTypeAnnotation: string[];
        Identifier: string[];
        IfStatement: string[];
        Import: string[];
        ImportDeclaration: string[];
        ImportDefaultSpecifier: string[];
        ImportNamespaceSpecifier: string[];
        ImportSpecifier: string[];
        InterfaceDeclaration: string[];
        InterfaceExtends: string[];
        IntersectionTypeAnnotation: string[];
        JSXAttribute: string[];
        JSXClosingElement: string[];
        JSXElement: string[];
        JSXEmptyExpression: string[];
        JSXExpressionContainer: string[];
        JSXIdentifier: string[];
        JSXMemberExpression: string[];
        JSXNamespacedName: string[];
        JSXOpeningElement: string[];
        JSXSpreadAttribute: string[];
        JSXSpreadChild: string[];
        JSXText: string[];
        LabeledStatement: string[];
        LogicalExpression: string[];
        MemberExpression: string[];
        MetaProperty: string[];
        MixedTypeAnnotation: string[];
        NewExpression: string[];
        Noop: any[];
        NullLiteral: string[];
        NullLiteralTypeAnnotation: string[];
        NullableTypeAnnotation: string[];
        NumberTypeAnnotation: string[];
        NumericLiteral: string[];
        NumericLiteralTypeAnnotation: string[];
        ObjectExpression: string[];
        ObjectMethod: string[];
        ObjectPattern: string[];
        ObjectProperty: string[];
        ObjectTypeAnnotation: string[];
        ObjectTypeCallProperty: string[];
        ObjectTypeIndexer: string[];
        ObjectTypeProperty: string[];
        ObjectTypeSpreadProperty: string[];
        OpaqueType: string[];
        ParenthesizedExpression: string[];
        Program: string[];
        QualifiedTypeIdentifier: string[];
        RegExpLiteral: string[];
        RestElement: string[];
        RestProperty: string[];
        ReturnStatement: string[];
        SequenceExpression: string[];
        SpreadElement: string[];
        SpreadProperty: string[];
        StringLiteral: string[];
        StringLiteralTypeAnnotation: string[];
        StringTypeAnnotation: string[];
        Super: string[];
        SwitchCase: any[];
        SwitchStatement: string[];
        TaggedTemplateExpression: string[];
        TemplateElement: any[];
        TemplateLiteral: string[];
        ThisExpression: string[];
        ThisTypeAnnotation: string[];
        ThrowStatement: string[];
        TryStatement: string[];
        TupleTypeAnnotation: string[];
        TypeAlias: string[];
        TypeAnnotation: string[];
        TypeCastExpression: string[];
        TypeParameter: string[];
        TypeParameterDeclaration: string[];
        TypeParameterInstantiation: string[];
        TypeofTypeAnnotation: string[];
        UnaryExpression: string[];
        UnionTypeAnnotation: string[];
        UpdateExpression: string[];
        VariableDeclaration: string[];
        VariableDeclarator: any[];
        VoidTypeAnnotation: string[];
        WhileStatement: string[];
        WithStatement: string[];
        YieldExpression: string[];
    };
    function AnyTypeAnnotation(...args: any[]): any;
    function ArrayExpression(...args: any[]): any;
    function ArrayPattern(...args: any[]): any;
    function ArrayTypeAnnotation(...args: any[]): any;
    function ArrowFunctionExpression(...args: any[]): any;
    function AssignmentExpression(...args: any[]): any;
    function AssignmentPattern(...args: any[]): any;
    function AwaitExpression(...args: any[]): any;
    const BINARY_OPERATORS: any;
    const BINARY_TYPES: string[];
    const BLOCKPARENT_TYPES: string[];
    const BLOCK_SCOPED_SYMBOL: any;
    const BLOCK_TYPES: string[];
    const BOOLEAN_BINARY_OPERATORS: any;
    const BOOLEAN_NUMBER_BINARY_OPERATORS: any;
    const BOOLEAN_UNARY_OPERATORS: any;
    const BUILDER_KEYS: {
        AnyTypeAnnotation: any[];
        ArrayExpression: string[];
        ArrayPattern: string[];
        ArrayTypeAnnotation: string[];
        ArrowFunctionExpression: string[];
        AssignmentExpression: string[];
        AssignmentPattern: string[];
        AwaitExpression: string[];
        BinaryExpression: string[];
        BindExpression: string[];
        BlockStatement: string[];
        BooleanLiteral: string[];
        BooleanLiteralTypeAnnotation: any[];
        BooleanTypeAnnotation: any[];
        BreakStatement: string[];
        CallExpression: string[];
        CatchClause: string[];
        ClassBody: string[];
        ClassDeclaration: string[];
        ClassExpression: string[];
        ClassImplements: string[];
        ClassMethod: string[];
        ClassProperty: string[];
        ConditionalExpression: string[];
        ContinueStatement: string[];
        DebuggerStatement: any[];
        DeclareClass: string[];
        DeclareExportDeclaration: string[];
        DeclareFunction: string[];
        DeclareInterface: string[];
        DeclareModule: string[];
        DeclareModuleExports: string[];
        DeclareOpaqueType: string[];
        DeclareTypeAlias: string[];
        DeclareVariable: string[];
        Decorator: string[];
        Directive: string[];
        DirectiveLiteral: string[];
        DoExpression: string[];
        DoWhileStatement: string[];
        EmptyStatement: any[];
        EmptyTypeAnnotation: any[];
        ExistentialTypeParam: any[];
        ExportAllDeclaration: string[];
        ExportDefaultDeclaration: string[];
        ExportDefaultSpecifier: string[];
        ExportNamedDeclaration: string[];
        ExportNamespaceSpecifier: string[];
        ExportSpecifier: string[];
        ExpressionStatement: string[];
        File: string[];
        ForAwaitStatement: string[];
        ForInStatement: string[];
        ForOfStatement: string[];
        ForStatement: string[];
        FunctionDeclaration: string[];
        FunctionExpression: string[];
        FunctionTypeAnnotation: string[];
        FunctionTypeParam: string[];
        GenericTypeAnnotation: string[];
        Identifier: string[];
        IfStatement: string[];
        Import: any[];
        ImportDeclaration: string[];
        ImportDefaultSpecifier: string[];
        ImportNamespaceSpecifier: string[];
        ImportSpecifier: string[];
        InterfaceDeclaration: string[];
        InterfaceExtends: string[];
        IntersectionTypeAnnotation: string[];
        JSXAttribute: string[];
        JSXClosingElement: string[];
        JSXElement: string[];
        JSXEmptyExpression: any[];
        JSXExpressionContainer: string[];
        JSXIdentifier: string[];
        JSXMemberExpression: string[];
        JSXNamespacedName: string[];
        JSXOpeningElement: string[];
        JSXSpreadAttribute: string[];
        JSXSpreadChild: string[];
        JSXText: string[];
        LabeledStatement: string[];
        LogicalExpression: string[];
        MemberExpression: string[];
        MetaProperty: string[];
        MixedTypeAnnotation: any[];
        NewExpression: string[];
        Noop: any[];
        NullLiteral: any[];
        NullLiteralTypeAnnotation: any[];
        NullableTypeAnnotation: string[];
        NumberTypeAnnotation: any[];
        NumericLiteral: string[];
        NumericLiteralTypeAnnotation: any[];
        ObjectExpression: string[];
        ObjectMethod: string[];
        ObjectPattern: string[];
        ObjectProperty: string[];
        ObjectTypeAnnotation: string[];
        ObjectTypeCallProperty: string[];
        ObjectTypeIndexer: string[];
        ObjectTypeProperty: string[];
        ObjectTypeSpreadProperty: string[];
        OpaqueType: string[];
        ParenthesizedExpression: string[];
        Program: string[];
        QualifiedTypeIdentifier: string[];
        RegExpLiteral: string[];
        RestElement: string[];
        RestProperty: string[];
        ReturnStatement: string[];
        SequenceExpression: string[];
        SpreadElement: string[];
        SpreadProperty: string[];
        StringLiteral: string[];
        StringLiteralTypeAnnotation: any[];
        StringTypeAnnotation: any[];
        Super: any[];
        SwitchCase: string[];
        SwitchStatement: string[];
        TaggedTemplateExpression: string[];
        TemplateElement: string[];
        TemplateLiteral: string[];
        ThisExpression: any[];
        ThisTypeAnnotation: any[];
        ThrowStatement: string[];
        TryStatement: string[];
        TupleTypeAnnotation: string[];
        TypeAlias: string[];
        TypeAnnotation: string[];
        TypeCastExpression: string[];
        TypeParameter: string[];
        TypeParameterDeclaration: string[];
        TypeParameterInstantiation: string[];
        TypeofTypeAnnotation: string[];
        UnaryExpression: string[];
        UnionTypeAnnotation: string[];
        UpdateExpression: string[];
        VariableDeclaration: string[];
        VariableDeclarator: string[];
        VoidTypeAnnotation: any[];
        WhileStatement: string[];
        WithStatement: string[];
        YieldExpression: string[];
    };
    function BinaryExpression(...args: any[]): any;
    function BindExpression(...args: any[]): any;
    function BlockStatement(...args: any[]): any;
    function BooleanLiteral(...args: any[]): any;
    function BooleanLiteralTypeAnnotation(...args: any[]): any;
    function BooleanTypeAnnotation(...args: any[]): any;
    function BreakStatement(...args: any[]): any;
    const CLASS_TYPES: string[];
    const COMMENT_KEYS: any;
    const COMPARISON_BINARY_OPERATORS: any;
    const COMPLETIONSTATEMENT_TYPES: string[];
    const CONDITIONAL_TYPES: string[];
    function CallExpression(...args: any[]): any;
    function CatchClause(...args: any[]): any;
    function ClassBody(...args: any[]): any;
    function ClassDeclaration(...args: any[]): any;
    function ClassExpression(...args: any[]): any;
    function ClassImplements(...args: any[]): any;
    function ClassMethod(...args: any[]): any;
    function ClassProperty(...args: any[]): any;
    function ConditionalExpression(...args: any[]): any;
    function ContinueStatement(...args: any[]): any;
    const DECLARATION_TYPES: string[];
    const DEPRECATED_KEYS: {
        NumberLiteral: string;
        RegexLiteral: string;
    };
    function DebuggerStatement(...args: any[]): any;
    function DeclareClass(...args: any[]): any;
    function DeclareExportDeclaration(...args: any[]): any;
    function DeclareFunction(...args: any[]): any;
    function DeclareInterface(...args: any[]): any;
    function DeclareModule(...args: any[]): any;
    function DeclareModuleExports(...args: any[]): any;
    function DeclareOpaqueType(...args: any[]): any;
    function DeclareTypeAlias(...args: any[]): any;
    function DeclareVariable(...args: any[]): any;
    function Decorator(...args: any[]): any;
    function Directive(...args: any[]): any;
    function DirectiveLiteral(...args: any[]): any;
    function DoExpression(...args: any[]): any;
    function DoWhileStatement(...args: any[]): any;
    const EQUALITY_BINARY_OPERATORS: any;
    const EXPORTDECLARATION_TYPES: string[];
    const EXPRESSIONWRAPPER_TYPES: string[];
    const EXPRESSION_TYPES: string[];
    function EmptyStatement(...args: any[]): any;
    function EmptyTypeAnnotation(...args: any[]): any;
    function ExistentialTypeParam(...args: any[]): any;
    function ExportAllDeclaration(...args: any[]): any;
    function ExportDefaultDeclaration(...args: any[]): any;
    function ExportDefaultSpecifier(...args: any[]): any;
    function ExportNamedDeclaration(...args: any[]): any;
    function ExportNamespaceSpecifier(...args: any[]): any;
    function ExportSpecifier(...args: any[]): any;
    function ExpressionStatement(...args: any[]): any;
    const FLATTENABLE_KEYS: any;
    const FLIPPED_ALIAS_KEYS: {
        Binary: string[];
        Block: string[];
        BlockParent: string[];
        Class: string[];
        CompletionStatement: string[];
        Conditional: string[];
        Declaration: string[];
        ExportDeclaration: string[];
        Expression: string[];
        ExpressionWrapper: string[];
        Flow: string[];
        FlowBaseAnnotation: string[];
        FlowDeclaration: string[];
        For: string[];
        ForXStatement: string[];
        Function: string[];
        FunctionParent: string[];
        Immutable: string[];
        JSX: string[];
        LVal: string[];
        Literal: string[];
        Loop: string[];
        Method: string[];
        ModuleDeclaration: string[];
        ModuleSpecifier: string[];
        ObjectMember: string[];
        Pattern: string[];
        Property: string[];
        Pureish: string[];
        Scopable: string[];
        Statement: string[];
        Terminatorless: string[];
        UnaryLike: string[];
        UserWhitespacable: string[];
        While: string[];
    };
    const FLOWBASEANNOTATION_TYPES: string[];
    const FLOWDECLARATION_TYPES: string[];
    const FLOW_TYPES: string[];
    const FORXSTATEMENT_TYPES: string[];
    const FOR_INIT_KEYS: any;
    const FOR_TYPES: string[];
    const FUNCTIONPARENT_TYPES: string[];
    const FUNCTION_TYPES: string[];
    function File(...args: any[]): any;
    function ForAwaitStatement(...args: any[]): any;
    function ForInStatement(...args: any[]): any;
    function ForOfStatement(...args: any[]): any;
    function ForStatement(...args: any[]): any;
    function FunctionDeclaration(...args: any[]): any;
    function FunctionExpression(...args: any[]): any;
    function FunctionTypeAnnotation(...args: any[]): any;
    function FunctionTypeParam(...args: any[]): any;
    function GenericTypeAnnotation(...args: any[]): any;
    const IMMUTABLE_TYPES: string[];
    const INHERIT_KEYS: any;
    function Identifier(...args: any[]): any;
    function IfStatement(...args: any[]): any;
    function Import(...args: any[]): any;
    function ImportDeclaration(...args: any[]): any;
    function ImportDefaultSpecifier(...args: any[]): any;
    function ImportNamespaceSpecifier(...args: any[]): any;
    function ImportSpecifier(...args: any[]): any;
    function InterfaceDeclaration(...args: any[]): any;
    function InterfaceExtends(...args: any[]): any;
    function IntersectionTypeAnnotation(...args: any[]): any;
    function JSXAttribute(...args: any[]): any;
    function JSXClosingElement(...args: any[]): any;
    function JSXElement(...args: any[]): any;
    function JSXEmptyExpression(...args: any[]): any;
    function JSXExpressionContainer(...args: any[]): any;
    function JSXIdentifier(...args: any[]): any;
    function JSXMemberExpression(...args: any[]): any;
    function JSXNamespacedName(...args: any[]): any;
    function JSXOpeningElement(...args: any[]): any;
    function JSXSpreadAttribute(...args: any[]): any;
    function JSXSpreadChild(...args: any[]): any;
    function JSXText(...args: any[]): any;
    const JSX_TYPES: string[];
    const LITERAL_TYPES: string[];
    const LOGICAL_OPERATORS: any;
    const LOOP_TYPES: string[];
    const LVAL_TYPES: string[];
    function LabeledStatement(...args: any[]): any;
    function LogicalExpression(...args: any[]): any;
    const METHOD_TYPES: string[];
    const MODULEDECLARATION_TYPES: string[];
    const MODULESPECIFIER_TYPES: string[];
    function MemberExpression(...args: any[]): any;
    function MetaProperty(...args: any[]): any;
    function MixedTypeAnnotation(...args: any[]): any;
    const NODE_FIELDS: {
        AnyTypeAnnotation: {};
        ArrayExpression: {
            elements: {
                default: any;
                validate: any;
            };
        };
        ArrayPattern: {
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            elements: {
                default: any;
                validate: any;
            };
            typeAnnotation: {
                default: any;
            };
        };
        ArrayTypeAnnotation: {
            elementType: {
                default: any;
            };
        };
        ArrowFunctionExpression: {
            async: {
                default: any;
                validate: any;
            };
            body: {
                default: any;
                validate: any;
            };
            params: {
                default: any;
                validate: any;
            };
            returnType: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        AssignmentExpression: {
            left: {
                default: any;
                validate: any;
            };
            operator: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        AssignmentPattern: {
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            left: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        AwaitExpression: {
            argument: {
                default: any;
                validate: any;
            };
        };
        BinaryExpression: {
            left: {
                default: any;
                validate: any;
            };
            operator: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        BindExpression: {
            callee: {
                default: any;
            };
            object: {
                default: any;
            };
        };
        BlockStatement: {
            body: {
                default: any;
                validate: any;
            };
            directives: {
                default: any;
                validate: any;
            };
        };
        BooleanLiteral: {
            value: {
                default: any;
                validate: any;
            };
        };
        BooleanLiteralTypeAnnotation: {};
        BooleanTypeAnnotation: {};
        BreakStatement: {
            label: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        CallExpression: {
            callee: {
                default: any;
                validate: any;
            };
        };
        CatchClause: {
            body: {
                default: any;
                validate: any;
            };
            param: {
                default: any;
                validate: any;
            };
        };
        ClassBody: {
            body: {
                default: any;
                validate: any;
            };
        };
        ClassDeclaration: {
            body: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                validate: any;
            };
            id: {
                default: any;
                validate: any;
            };
            implements: {
                default: any;
                optional: any;
            };
            mixins: {
                default: any;
                optional: any;
            };
            superClass: {
                default: any;
                optional: any;
                validate: any;
            };
            superTypeParameters: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        ClassExpression: {
            body: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                validate: any;
            };
            id: {
                default: any;
                optional: any;
                validate: any;
            };
            implements: {
                default: any;
                optional: any;
            };
            mixins: {
                default: any;
                optional: any;
            };
            superClass: {
                default: any;
                optional: any;
                validate: any;
            };
            superTypeParameters: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        ClassImplements: {
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        ClassMethod: {
            async: {
                default: any;
                optional: any;
                validate: any;
            };
            body: {
                default: any;
                validate: any;
            };
            computed: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                optional: any;
            };
            generator: {
                default: any;
                optional: any;
                validate: any;
            };
            key: {
                default: any;
                validate: any;
            };
            kind: {
                default: any;
                validate: any;
            };
            params: {
                default: any;
                validate: any;
            };
            returnType: {
                default: any;
                optional: any;
            };
            static: {
                default: any;
                validate: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        ClassProperty: {
            computed: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
            };
            key: {
                default: any;
            };
            typeAnnotation: {
                default: any;
            };
            value: {
                default: any;
            };
        };
        ConditionalExpression: {
            alternate: {
                default: any;
                validate: any;
            };
            consequent: {
                default: any;
                validate: any;
            };
            test: {
                default: any;
                validate: any;
            };
        };
        ContinueStatement: {
            label: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        DebuggerStatement: {};
        DeclareClass: {
            body: {
                default: any;
            };
            extends: {
                default: any;
            };
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        DeclareExportDeclaration: {
            declaration: {
                default: any;
            };
            source: {
                default: any;
            };
            specifiers: {
                default: any;
            };
        };
        DeclareFunction: {
            id: {
                default: any;
            };
        };
        DeclareInterface: {
            body: {
                default: any;
            };
            extends: {
                default: any;
            };
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        DeclareModule: {
            body: {
                default: any;
            };
            id: {
                default: any;
            };
        };
        DeclareModuleExports: {
            typeAnnotation: {
                default: any;
            };
        };
        DeclareOpaqueType: {
            id: {
                default: any;
            };
            supertype: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        DeclareTypeAlias: {
            id: {
                default: any;
            };
            right: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        DeclareVariable: {
            id: {
                default: any;
            };
        };
        Decorator: {
            expression: {
                default: any;
                validate: any;
            };
        };
        Directive: {
            value: {
                default: any;
                validate: any;
            };
        };
        DirectiveLiteral: {
            value: {
                default: any;
                validate: any;
            };
        };
        DoExpression: {
            body: {
                default: any;
                validate: any;
            };
        };
        DoWhileStatement: {
            body: {
                default: any;
                validate: any;
            };
            test: {
                default: any;
                validate: any;
            };
        };
        EmptyStatement: {};
        EmptyTypeAnnotation: {};
        ExistentialTypeParam: {};
        ExportAllDeclaration: {
            source: {
                default: any;
                validate: any;
            };
        };
        ExportDefaultDeclaration: {
            declaration: {
                default: any;
                validate: any;
            };
        };
        ExportDefaultSpecifier: {
            exported: {
                default: any;
                validate: any;
            };
        };
        ExportNamedDeclaration: {
            declaration: {
                default: any;
                optional: any;
                validate: any;
            };
            source: {
                default: any;
                optional: any;
                validate: any;
            };
            specifiers: {
                default: any;
                validate: any;
            };
        };
        ExportNamespaceSpecifier: {
            exported: {
                default: any;
                validate: any;
            };
        };
        ExportSpecifier: {
            exported: {
                default: any;
                validate: any;
            };
            local: {
                default: any;
                validate: any;
            };
        };
        ExpressionStatement: {
            expression: {
                default: any;
                validate: any;
            };
        };
        File: {
            comments: {
                default: any;
            };
            program: {
                default: any;
                validate: any;
            };
            tokens: {
                default: any;
            };
        };
        ForAwaitStatement: {
            body: {
                default: any;
                validate: any;
            };
            left: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        ForInStatement: {
            body: {
                default: any;
                validate: any;
            };
            left: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        ForOfStatement: {
            body: {
                default: any;
                validate: any;
            };
            left: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        ForStatement: {
            body: {
                default: any;
                validate: any;
            };
            init: {
                default: any;
                optional: any;
                validate: any;
            };
            test: {
                default: any;
                optional: any;
                validate: any;
            };
            update: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        FunctionDeclaration: {
            async: {
                default: any;
                validate: any;
            };
            body: {
                default: any;
                validate: any;
            };
            generator: {
                default: any;
                validate: any;
            };
            id: {
                default: any;
                validate: any;
            };
            params: {
                default: any;
                validate: any;
            };
            returnType: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        FunctionExpression: {
            async: {
                default: any;
                validate: any;
            };
            body: {
                default: any;
                validate: any;
            };
            generator: {
                default: any;
                validate: any;
            };
            id: {
                default: any;
                optional: any;
                validate: any;
            };
            params: {
                default: any;
                validate: any;
            };
            returnType: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        FunctionTypeAnnotation: {
            params: {
                default: any;
            };
            rest: {
                default: any;
            };
            returnType: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        FunctionTypeParam: {
            name: {
                default: any;
            };
            typeAnnotation: {
                default: any;
            };
        };
        GenericTypeAnnotation: {
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        Identifier: {
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            name: {
                default: any;
                validate: any;
            };
            typeAnnotation: {
                default: any;
                optional: any;
            };
        };
        IfStatement: {
            alternate: {
                default: any;
                optional: any;
                validate: any;
            };
            consequent: {
                default: any;
                validate: any;
            };
            test: {
                default: any;
                validate: any;
            };
        };
        Import: {};
        ImportDeclaration: {
            source: {
                default: any;
                validate: any;
            };
            specifiers: {
                default: any;
                validate: any;
            };
        };
        ImportDefaultSpecifier: {
            local: {
                default: any;
                validate: any;
            };
        };
        ImportNamespaceSpecifier: {
            local: {
                default: any;
                validate: any;
            };
        };
        ImportSpecifier: {
            importKind: {
                default: any;
                optional: any;
                validate: any;
            };
            imported: {
                default: any;
                validate: any;
            };
            local: {
                default: any;
                validate: any;
            };
        };
        InterfaceDeclaration: {
            body: {
                default: any;
            };
            extends: {
                default: any;
            };
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        InterfaceExtends: {
            id: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        IntersectionTypeAnnotation: {
            types: {
                default: any;
            };
        };
        JSXAttribute: {
            name: {
                default: any;
                validate: any;
            };
            value: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        JSXClosingElement: {
            name: {
                default: any;
                validate: any;
            };
        };
        JSXElement: {
            children: {
                default: any;
                validate: any;
            };
            closingElement: {
                default: any;
                optional: any;
                validate: any;
            };
            openingElement: {
                default: any;
                validate: any;
            };
            selfClosing: {
                default: any;
            };
        };
        JSXEmptyExpression: {};
        JSXExpressionContainer: {
            expression: {
                default: any;
                validate: any;
            };
        };
        JSXIdentifier: {
            name: {
                default: any;
                validate: any;
            };
        };
        JSXMemberExpression: {
            object: {
                default: any;
                validate: any;
            };
            property: {
                default: any;
                validate: any;
            };
        };
        JSXNamespacedName: {
            name: {
                default: any;
                validate: any;
            };
            namespace: {
                default: any;
                validate: any;
            };
        };
        JSXOpeningElement: {
            attributes: {
                default: any;
                validate: any;
            };
            name: {
                default: any;
                validate: any;
            };
            selfClosing: {
                default: any;
                validate: any;
            };
        };
        JSXSpreadAttribute: {
            argument: {
                default: any;
                validate: any;
            };
        };
        JSXSpreadChild: {
            expression: {
                default: any;
                validate: any;
            };
        };
        JSXText: {
            value: {
                default: any;
                validate: any;
            };
        };
        LabeledStatement: {
            body: {
                default: any;
                validate: any;
            };
            label: {
                default: any;
                validate: any;
            };
        };
        LogicalExpression: {
            left: {
                default: any;
                validate: any;
            };
            operator: {
                default: any;
                validate: any;
            };
            right: {
                default: any;
                validate: any;
            };
        };
        MemberExpression: {
            computed: {
                default: any;
                validate: any;
            };
            object: {
                default: any;
                validate: any;
            };
            property: {
                default: any;
                validate: any;
            };
        };
        MetaProperty: {
            meta: {
                default: any;
                validate: any;
            };
            property: {
                default: any;
                validate: any;
            };
        };
        MixedTypeAnnotation: {};
        NewExpression: {
            callee: {
                default: any;
                validate: any;
            };
        };
        Noop: {};
        NullLiteral: {};
        NullLiteralTypeAnnotation: {};
        NullableTypeAnnotation: {
            typeAnnotation: {
                default: any;
            };
        };
        NumberTypeAnnotation: {};
        NumericLiteral: {
            value: {
                default: any;
                validate: any;
            };
        };
        NumericLiteralTypeAnnotation: {};
        ObjectExpression: {
            properties: {
                default: any;
                validate: any;
            };
        };
        ObjectMethod: {
            async: {
                default: any;
                optional: any;
                validate: any;
            };
            body: {
                default: any;
                validate: any;
            };
            computed: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            generator: {
                default: any;
                optional: any;
                validate: any;
            };
            key: {
                default: any;
                validate: any;
            };
            kind: {
                default: any;
                validate: any;
            };
            params: {
                default: any;
            };
            returnType: {
                default: any;
                optional: any;
            };
            typeParameters: {
                default: any;
                optional: any;
            };
        };
        ObjectPattern: {
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            properties: {
                default: any;
                validate: any;
            };
            typeAnnotation: {
                default: any;
            };
        };
        ObjectProperty: {
            computed: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            key: {
                default: any;
                validate: any;
            };
            shorthand: {
                default: any;
                validate: any;
            };
            value: {
                default: any;
                validate: any;
            };
        };
        ObjectTypeAnnotation: {
            callProperties: {
                default: any;
            };
            indexers: {
                default: any;
            };
            properties: {
                default: any;
            };
        };
        ObjectTypeCallProperty: {
            value: {
                default: any;
            };
        };
        ObjectTypeIndexer: {
            id: {
                default: any;
            };
            key: {
                default: any;
            };
            value: {
                default: any;
            };
        };
        ObjectTypeProperty: {
            key: {
                default: any;
            };
            value: {
                default: any;
            };
        };
        ObjectTypeSpreadProperty: {
            argument: {
                default: any;
            };
        };
        OpaqueType: {
            id: {
                default: any;
            };
            impltype: {
                default: any;
            };
            supertype: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        ParenthesizedExpression: {
            expression: {
                default: any;
                validate: any;
            };
        };
        Program: {
            body: {
                default: any;
                validate: any;
            };
            directives: {
                default: any;
                validate: any;
            };
        };
        QualifiedTypeIdentifier: {
            id: {
                default: any;
            };
            qualification: {
                default: any;
            };
        };
        RegExpLiteral: {
            flags: {
                default: any;
                validate: any;
            };
            pattern: {
                default: any;
                validate: any;
            };
        };
        RestElement: {
            argument: {
                default: any;
                validate: any;
            };
            decorators: {
                default: any;
                optional: any;
                validate: any;
            };
            typeAnnotation: {
                default: any;
            };
        };
        RestProperty: {
            argument: {
                default: any;
                validate: any;
            };
        };
        ReturnStatement: {
            argument: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        SequenceExpression: {
            expressions: {
                default: any;
                validate: any;
            };
        };
        SpreadElement: {
            argument: {
                default: any;
                validate: any;
            };
        };
        SpreadProperty: {
            argument: {
                default: any;
                validate: any;
            };
        };
        StringLiteral: {
            value: {
                default: any;
                validate: any;
            };
        };
        StringLiteralTypeAnnotation: {};
        StringTypeAnnotation: {};
        Super: {};
        SwitchCase: {
            consequent: {
                default: any;
                validate: any;
            };
            test: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        SwitchStatement: {
            cases: {
                default: any;
                validate: any;
            };
            discriminant: {
                default: any;
                validate: any;
            };
        };
        TaggedTemplateExpression: {
            quasi: {
                default: any;
                validate: any;
            };
            tag: {
                default: any;
                validate: any;
            };
        };
        TemplateElement: {
            tail: {
                default: any;
                validate: any;
            };
            value: {
                default: any;
            };
        };
        TemplateLiteral: {
            expressions: {
                default: any;
                validate: any;
            };
            quasis: {
                default: any;
                validate: any;
            };
        };
        ThisExpression: {};
        ThisTypeAnnotation: {};
        ThrowStatement: {
            argument: {
                default: any;
                validate: any;
            };
        };
        TryStatement: {
            block: {
                default: any;
            };
            body: {
                default: any;
                optional: any;
                validate: any;
            };
            finalizer: {
                default: any;
                optional: any;
                validate: any;
            };
            handler: {
                default: any;
                handler: any;
                optional: any;
            };
        };
        TupleTypeAnnotation: {
            types: {
                default: any;
            };
        };
        TypeAlias: {
            id: {
                default: any;
            };
            right: {
                default: any;
            };
            typeParameters: {
                default: any;
            };
        };
        TypeAnnotation: {
            typeAnnotation: {
                default: any;
            };
        };
        TypeCastExpression: {
            expression: {
                default: any;
            };
            typeAnnotation: {
                default: any;
            };
        };
        TypeParameter: {
            bound: {
                default: any;
            };
        };
        TypeParameterDeclaration: {
            params: {
                default: any;
            };
        };
        TypeParameterInstantiation: {
            params: {
                default: any;
            };
        };
        TypeofTypeAnnotation: {
            argument: {
                default: any;
            };
        };
        UnaryExpression: {
            argument: {
                default: any;
                validate: any;
            };
            operator: {
                default: any;
                validate: any;
            };
            prefix: {
                default: any;
                validate: any;
            };
        };
        UnionTypeAnnotation: {
            types: {
                default: any;
            };
        };
        UpdateExpression: {
            argument: {
                default: any;
                validate: any;
            };
            operator: {
                default: any;
                validate: any;
            };
            prefix: {
                default: any;
                validate: any;
            };
        };
        VariableDeclaration: {
            declarations: {
                default: any;
                validate: any;
            };
            kind: {
                default: any;
                validate: any;
            };
        };
        VariableDeclarator: {
            id: {
                default: any;
                validate: any;
            };
            init: {
                default: any;
                optional: any;
                validate: any;
            };
        };
        VoidTypeAnnotation: {};
        WhileStatement: {
            body: {
                default: any;
                validate: any;
            };
            test: {
                default: any;
                validate: any;
            };
        };
        WithStatement: {
            body: {
                default: any;
                validate: any;
            };
            object: {
                default: any;
                object: any;
            };
        };
        YieldExpression: {
            argument: {
                default: any;
                optional: any;
                validate: any;
            };
            delegate: {
                default: any;
                validate: any;
            };
        };
    };
    const NOT_LOCAL_BINDING: any;
    const NUMBER_BINARY_OPERATORS: any;
    const NUMBER_UNARY_OPERATORS: any;
    function NewExpression(...args: any[]): any;
    function Noop(...args: any[]): any;
    function NullLiteral(...args: any[]): any;
    function NullLiteralTypeAnnotation(...args: any[]): any;
    function NullableTypeAnnotation(...args: any[]): any;
    function NumberLiteral(...args: any[]): any;
    function NumberTypeAnnotation(...args: any[]): any;
    function NumericLiteral(...args: any[]): any;
    function NumericLiteralTypeAnnotation(...args: any[]): any;
    const OBJECTMEMBER_TYPES: string[];
    function ObjectExpression(...args: any[]): any;
    function ObjectMethod(...args: any[]): any;
    function ObjectPattern(...args: any[]): any;
    function ObjectProperty(...args: any[]): any;
    function ObjectTypeAnnotation(...args: any[]): any;
    function ObjectTypeCallProperty(...args: any[]): any;
    function ObjectTypeIndexer(...args: any[]): any;
    function ObjectTypeProperty(...args: any[]): any;
    function ObjectTypeSpreadProperty(...args: any[]): any;
    function OpaqueType(...args: any[]): any;
    const PATTERN_TYPES: string[];
    const PROPERTY_TYPES: string[];
    const PUREISH_TYPES: string[];
    function ParenthesizedExpression(...args: any[]): any;
    function Program(...args: any[]): any;
    function QualifiedTypeIdentifier(...args: any[]): any;
    function RegExpLiteral(...args: any[]): any;
    function RegexLiteral(...args: any[]): any;
    function RestElement(...args: any[]): any;
    function RestProperty(...args: any[]): any;
    function ReturnStatement(...args: any[]): any;
    const SCOPABLE_TYPES: string[];
    const STATEMENT_OR_BLOCK_KEYS: any;
    const STATEMENT_TYPES: string[];
    const STRING_UNARY_OPERATORS: any;
    function SequenceExpression(...args: any[]): any;
    function SpreadElement(...args: any[]): any;
    function SpreadProperty(...args: any[]): any;
    function StringLiteral(...args: any[]): any;
    function StringLiteralTypeAnnotation(...args: any[]): any;
    function StringTypeAnnotation(...args: any[]): any;
    function Super(...args: any[]): any;
    function SwitchCase(...args: any[]): any;
    function SwitchStatement(...args: any[]): any;
    const TERMINATORLESS_TYPES: string[];
    const TYPES: string[];
    function TaggedTemplateExpression(...args: any[]): any;
    function TemplateElement(...args: any[]): any;
    function TemplateLiteral(...args: any[]): any;
    function ThisExpression(...args: any[]): any;
    function ThisTypeAnnotation(...args: any[]): any;
    function ThrowStatement(...args: any[]): any;
    function TryStatement(...args: any[]): any;
    function TupleTypeAnnotation(...args: any[]): any;
    function TypeAlias(...args: any[]): any;
    function TypeAnnotation(...args: any[]): any;
    function TypeCastExpression(...args: any[]): any;
    function TypeParameter(...args: any[]): any;
    function TypeParameterDeclaration(...args: any[]): any;
    function TypeParameterInstantiation(...args: any[]): any;
    function TypeofTypeAnnotation(...args: any[]): any;
    const UNARYLIKE_TYPES: string[];
    const UNARY_OPERATORS: any;
    const UPDATE_OPERATORS: any;
    const USERWHITESPACABLE_TYPES: string[];
    function UnaryExpression(...args: any[]): any;
    function UnionTypeAnnotation(...args: any[]): any;
    function UpdateExpression(...args: any[]): any;
    const VISITOR_KEYS: {
        AnyTypeAnnotation: any[];
        ArrayExpression: string[];
        ArrayPattern: string[];
        ArrayTypeAnnotation: string[];
        ArrowFunctionExpression: string[];
        AssignmentExpression: string[];
        AssignmentPattern: string[];
        AwaitExpression: string[];
        BinaryExpression: string[];
        BindExpression: string[];
        BlockStatement: string[];
        BooleanLiteral: any[];
        BooleanLiteralTypeAnnotation: any[];
        BooleanTypeAnnotation: any[];
        BreakStatement: string[];
        CallExpression: string[];
        CatchClause: string[];
        ClassBody: string[];
        ClassDeclaration: string[];
        ClassExpression: string[];
        ClassImplements: string[];
        ClassMethod: string[];
        ClassProperty: string[];
        ConditionalExpression: string[];
        ContinueStatement: string[];
        DebuggerStatement: any[];
        DeclareClass: string[];
        DeclareExportDeclaration: string[];
        DeclareFunction: string[];
        DeclareInterface: string[];
        DeclareModule: string[];
        DeclareModuleExports: string[];
        DeclareOpaqueType: string[];
        DeclareTypeAlias: string[];
        DeclareVariable: string[];
        Decorator: string[];
        Directive: string[];
        DirectiveLiteral: any[];
        DoExpression: string[];
        DoWhileStatement: string[];
        EmptyStatement: any[];
        EmptyTypeAnnotation: any[];
        ExistentialTypeParam: any[];
        ExportAllDeclaration: string[];
        ExportDefaultDeclaration: string[];
        ExportDefaultSpecifier: string[];
        ExportNamedDeclaration: string[];
        ExportNamespaceSpecifier: string[];
        ExportSpecifier: string[];
        ExpressionStatement: string[];
        File: string[];
        ForAwaitStatement: string[];
        ForInStatement: string[];
        ForOfStatement: string[];
        ForStatement: string[];
        FunctionDeclaration: string[];
        FunctionExpression: string[];
        FunctionTypeAnnotation: string[];
        FunctionTypeParam: string[];
        GenericTypeAnnotation: string[];
        Identifier: string[];
        IfStatement: string[];
        Import: any[];
        ImportDeclaration: string[];
        ImportDefaultSpecifier: string[];
        ImportNamespaceSpecifier: string[];
        ImportSpecifier: string[];
        InterfaceDeclaration: string[];
        InterfaceExtends: string[];
        IntersectionTypeAnnotation: string[];
        JSXAttribute: string[];
        JSXClosingElement: string[];
        JSXElement: string[];
        JSXEmptyExpression: any[];
        JSXExpressionContainer: string[];
        JSXIdentifier: any[];
        JSXMemberExpression: string[];
        JSXNamespacedName: string[];
        JSXOpeningElement: string[];
        JSXSpreadAttribute: string[];
        JSXSpreadChild: string[];
        JSXText: any[];
        LabeledStatement: string[];
        LogicalExpression: string[];
        MemberExpression: string[];
        MetaProperty: string[];
        MixedTypeAnnotation: any[];
        NewExpression: string[];
        Noop: any[];
        NullLiteral: any[];
        NullLiteralTypeAnnotation: any[];
        NullableTypeAnnotation: string[];
        NumberTypeAnnotation: any[];
        NumericLiteral: any[];
        NumericLiteralTypeAnnotation: any[];
        ObjectExpression: string[];
        ObjectMethod: string[];
        ObjectPattern: string[];
        ObjectProperty: string[];
        ObjectTypeAnnotation: string[];
        ObjectTypeCallProperty: string[];
        ObjectTypeIndexer: string[];
        ObjectTypeProperty: string[];
        ObjectTypeSpreadProperty: string[];
        OpaqueType: string[];
        ParenthesizedExpression: string[];
        Program: string[];
        QualifiedTypeIdentifier: string[];
        RegExpLiteral: any[];
        RestElement: string[];
        RestProperty: string[];
        ReturnStatement: string[];
        SequenceExpression: string[];
        SpreadElement: string[];
        SpreadProperty: string[];
        StringLiteral: any[];
        StringLiteralTypeAnnotation: any[];
        StringTypeAnnotation: any[];
        Super: any[];
        SwitchCase: string[];
        SwitchStatement: string[];
        TaggedTemplateExpression: string[];
        TemplateElement: any[];
        TemplateLiteral: string[];
        ThisExpression: any[];
        ThisTypeAnnotation: any[];
        ThrowStatement: string[];
        TryStatement: string[];
        TupleTypeAnnotation: string[];
        TypeAlias: string[];
        TypeAnnotation: string[];
        TypeCastExpression: string[];
        TypeParameter: string[];
        TypeParameterDeclaration: string[];
        TypeParameterInstantiation: string[];
        TypeofTypeAnnotation: string[];
        UnaryExpression: string[];
        UnionTypeAnnotation: string[];
        UpdateExpression: string[];
        VariableDeclaration: string[];
        VariableDeclarator: string[];
        VoidTypeAnnotation: any[];
        WhileStatement: string[];
        WithStatement: string[];
        YieldExpression: string[];
    };
    function VariableDeclaration(...args: any[]): any;
    function VariableDeclarator(...args: any[]): any;
    function VoidTypeAnnotation(...args: any[]): any;
    const WHILE_TYPES: string[];
    function WhileStatement(...args: any[]): any;
    function WithStatement(...args: any[]): any;
    function YieldExpression(...args: any[]): any;
    function anyTypeAnnotation(...args: any[]): any;
    function appendToMemberExpression(member: any, append: any, computed: any): any;
    function arrayExpression(...args: any[]): any;
    function arrayPattern(...args: any[]): any;
    function arrayTypeAnnotation(...args: any[]): any;
    function arrowFunctionExpression(...args: any[]): any;
    function assertAnyTypeAnnotation(node: any, opts: any): void;
    function assertArrayExpression(node: any, opts: any): void;
    function assertArrayPattern(node: any, opts: any): void;
    function assertArrayTypeAnnotation(node: any, opts: any): void;
    function assertArrowFunctionExpression(node: any, opts: any): void;
    function assertAssignmentExpression(node: any, opts: any): void;
    function assertAssignmentPattern(node: any, opts: any): void;
    function assertAwaitExpression(node: any, opts: any): void;
    function assertBinary(node: any, opts: any): void;
    function assertBinaryExpression(node: any, opts: any): void;
    function assertBindExpression(node: any, opts: any): void;
    function assertBlock(node: any, opts: any): void;
    function assertBlockParent(node: any, opts: any): void;
    function assertBlockStatement(node: any, opts: any): void;
    function assertBooleanLiteral(node: any, opts: any): void;
    function assertBooleanLiteralTypeAnnotation(node: any, opts: any): void;
    function assertBooleanTypeAnnotation(node: any, opts: any): void;
    function assertBreakStatement(node: any, opts: any): void;
    function assertCallExpression(node: any, opts: any): void;
    function assertCatchClause(node: any, opts: any): void;
    function assertClass(node: any, opts: any): void;
    function assertClassBody(node: any, opts: any): void;
    function assertClassDeclaration(node: any, opts: any): void;
    function assertClassExpression(node: any, opts: any): void;
    function assertClassImplements(node: any, opts: any): void;
    function assertClassMethod(node: any, opts: any): void;
    function assertClassProperty(node: any, opts: any): void;
    function assertCompletionStatement(node: any, opts: any): void;
    function assertConditional(node: any, opts: any): void;
    function assertConditionalExpression(node: any, opts: any): void;
    function assertContinueStatement(node: any, opts: any): void;
    function assertDebuggerStatement(node: any, opts: any): void;
    function assertDeclaration(node: any, opts: any): void;
    function assertDeclareClass(node: any, opts: any): void;
    function assertDeclareExportDeclaration(node: any, opts: any): void;
    function assertDeclareFunction(node: any, opts: any): void;
    function assertDeclareInterface(node: any, opts: any): void;
    function assertDeclareModule(node: any, opts: any): void;
    function assertDeclareModuleExports(node: any, opts: any): void;
    function assertDeclareOpaqueType(node: any, opts: any): void;
    function assertDeclareTypeAlias(node: any, opts: any): void;
    function assertDeclareVariable(node: any, opts: any): void;
    function assertDecorator(node: any, opts: any): void;
    function assertDirective(node: any, opts: any): void;
    function assertDirectiveLiteral(node: any, opts: any): void;
    function assertDoExpression(node: any, opts: any): void;
    function assertDoWhileStatement(node: any, opts: any): void;
    function assertEmptyStatement(node: any, opts: any): void;
    function assertEmptyTypeAnnotation(node: any, opts: any): void;
    function assertExistentialTypeParam(node: any, opts: any): void;
    function assertExportAllDeclaration(node: any, opts: any): void;
    function assertExportDeclaration(node: any, opts: any): void;
    function assertExportDefaultDeclaration(node: any, opts: any): void;
    function assertExportDefaultSpecifier(node: any, opts: any): void;
    function assertExportNamedDeclaration(node: any, opts: any): void;
    function assertExportNamespaceSpecifier(node: any, opts: any): void;
    function assertExportSpecifier(node: any, opts: any): void;
    function assertExpression(node: any, opts: any): void;
    function assertExpressionStatement(node: any, opts: any): void;
    function assertExpressionWrapper(node: any, opts: any): void;
    function assertFile(node: any, opts: any): void;
    function assertFlow(node: any, opts: any): void;
    function assertFlowBaseAnnotation(node: any, opts: any): void;
    function assertFlowDeclaration(node: any, opts: any): void;
    function assertFor(node: any, opts: any): void;
    function assertForAwaitStatement(node: any, opts: any): void;
    function assertForInStatement(node: any, opts: any): void;
    function assertForOfStatement(node: any, opts: any): void;
    function assertForStatement(node: any, opts: any): void;
    function assertForXStatement(node: any, opts: any): void;
    function assertFunction(node: any, opts: any): void;
    function assertFunctionDeclaration(node: any, opts: any): void;
    function assertFunctionExpression(node: any, opts: any): void;
    function assertFunctionParent(node: any, opts: any): void;
    function assertFunctionTypeAnnotation(node: any, opts: any): void;
    function assertFunctionTypeParam(node: any, opts: any): void;
    function assertGenericTypeAnnotation(node: any, opts: any): void;
    function assertIdentifier(node: any, opts: any): void;
    function assertIfStatement(node: any, opts: any): void;
    function assertImmutable(node: any, opts: any): void;
    function assertImport(node: any, opts: any): void;
    function assertImportDeclaration(node: any, opts: any): void;
    function assertImportDefaultSpecifier(node: any, opts: any): void;
    function assertImportNamespaceSpecifier(node: any, opts: any): void;
    function assertImportSpecifier(node: any, opts: any): void;
    function assertInterfaceDeclaration(node: any, opts: any): void;
    function assertInterfaceExtends(node: any, opts: any): void;
    function assertIntersectionTypeAnnotation(node: any, opts: any): void;
    function assertJSX(node: any, opts: any): void;
    function assertJSXAttribute(node: any, opts: any): void;
    function assertJSXClosingElement(node: any, opts: any): void;
    function assertJSXElement(node: any, opts: any): void;
    function assertJSXEmptyExpression(node: any, opts: any): void;
    function assertJSXExpressionContainer(node: any, opts: any): void;
    function assertJSXIdentifier(node: any, opts: any): void;
    function assertJSXMemberExpression(node: any, opts: any): void;
    function assertJSXNamespacedName(node: any, opts: any): void;
    function assertJSXOpeningElement(node: any, opts: any): void;
    function assertJSXSpreadAttribute(node: any, opts: any): void;
    function assertJSXSpreadChild(node: any, opts: any): void;
    function assertJSXText(node: any, opts: any): void;
    function assertLVal(node: any, opts: any): void;
    function assertLabeledStatement(node: any, opts: any): void;
    function assertLiteral(node: any, opts: any): void;
    function assertLogicalExpression(node: any, opts: any): void;
    function assertLoop(node: any, opts: any): void;
    function assertMemberExpression(node: any, opts: any): void;
    function assertMetaProperty(node: any, opts: any): void;
    function assertMethod(node: any, opts: any): void;
    function assertMixedTypeAnnotation(node: any, opts: any): void;
    function assertModuleDeclaration(node: any, opts: any): void;
    function assertModuleSpecifier(node: any, opts: any): void;
    function assertNewExpression(node: any, opts: any): void;
    function assertNode(node: any): void;
    function assertNoop(node: any, opts: any): void;
    function assertNullLiteral(node: any, opts: any): void;
    function assertNullLiteralTypeAnnotation(node: any, opts: any): void;
    function assertNullableTypeAnnotation(node: any, opts: any): void;
    function assertNumberLiteral(...args: any[]): any;
    function assertNumberTypeAnnotation(node: any, opts: any): void;
    function assertNumericLiteral(node: any, opts: any): void;
    function assertNumericLiteralTypeAnnotation(node: any, opts: any): void;
    function assertObjectExpression(node: any, opts: any): void;
    function assertObjectMember(node: any, opts: any): void;
    function assertObjectMethod(node: any, opts: any): void;
    function assertObjectPattern(node: any, opts: any): void;
    function assertObjectProperty(node: any, opts: any): void;
    function assertObjectTypeAnnotation(node: any, opts: any): void;
    function assertObjectTypeCallProperty(node: any, opts: any): void;
    function assertObjectTypeIndexer(node: any, opts: any): void;
    function assertObjectTypeProperty(node: any, opts: any): void;
    function assertObjectTypeSpreadProperty(node: any, opts: any): void;
    function assertOpaqueType(node: any, opts: any): void;
    function assertParenthesizedExpression(node: any, opts: any): void;
    function assertPattern(node: any, opts: any): void;
    function assertProgram(node: any, opts: any): void;
    function assertProperty(node: any, opts: any): void;
    function assertPureish(node: any, opts: any): void;
    function assertQualifiedTypeIdentifier(node: any, opts: any): void;
    function assertRegExpLiteral(node: any, opts: any): void;
    function assertRegexLiteral(...args: any[]): any;
    function assertRestElement(node: any, opts: any): void;
    function assertRestProperty(node: any, opts: any): void;
    function assertReturnStatement(node: any, opts: any): void;
    function assertScopable(node: any, opts: any): void;
    function assertSequenceExpression(node: any, opts: any): void;
    function assertSpreadElement(node: any, opts: any): void;
    function assertSpreadProperty(node: any, opts: any): void;
    function assertStatement(node: any, opts: any): void;
    function assertStringLiteral(node: any, opts: any): void;
    function assertStringLiteralTypeAnnotation(node: any, opts: any): void;
    function assertStringTypeAnnotation(node: any, opts: any): void;
    function assertSuper(node: any, opts: any): void;
    function assertSwitchCase(node: any, opts: any): void;
    function assertSwitchStatement(node: any, opts: any): void;
    function assertTaggedTemplateExpression(node: any, opts: any): void;
    function assertTemplateElement(node: any, opts: any): void;
    function assertTemplateLiteral(node: any, opts: any): void;
    function assertTerminatorless(node: any, opts: any): void;
    function assertThisExpression(node: any, opts: any): void;
    function assertThisTypeAnnotation(node: any, opts: any): void;
    function assertThrowStatement(node: any, opts: any): void;
    function assertTryStatement(node: any, opts: any): void;
    function assertTupleTypeAnnotation(node: any, opts: any): void;
    function assertTypeAlias(node: any, opts: any): void;
    function assertTypeAnnotation(node: any, opts: any): void;
    function assertTypeCastExpression(node: any, opts: any): void;
    function assertTypeParameter(node: any, opts: any): void;
    function assertTypeParameterDeclaration(node: any, opts: any): void;
    function assertTypeParameterInstantiation(node: any, opts: any): void;
    function assertTypeofTypeAnnotation(node: any, opts: any): void;
    function assertUnaryExpression(node: any, opts: any): void;
    function assertUnaryLike(node: any, opts: any): void;
    function assertUnionTypeAnnotation(node: any, opts: any): void;
    function assertUpdateExpression(node: any, opts: any): void;
    function assertUserWhitespacable(node: any, opts: any): void;
    function assertVariableDeclaration(node: any, opts: any): void;
    function assertVariableDeclarator(node: any, opts: any): void;
    function assertVoidTypeAnnotation(node: any, opts: any): void;
    function assertWhile(node: any, opts: any): void;
    function assertWhileStatement(node: any, opts: any): void;
    function assertWithStatement(node: any, opts: any): void;
    function assertYieldExpression(node: any, opts: any): void;
    function assignmentExpression(...args: any[]): any;
    function assignmentPattern(...args: any[]): any;
    function awaitExpression(...args: any[]): any;
    function binaryExpression(...args: any[]): any;
    function bindExpression(...args: any[]): any;
    function blockStatement(...args: any[]): any;
    function booleanLiteral(...args: any[]): any;
    function booleanLiteralTypeAnnotation(...args: any[]): any;
    function booleanTypeAnnotation(...args: any[]): any;
    function breakStatement(...args: any[]): any;
    function buildMatchMemberExpression(match: any, allowPartial: any): any;
    function callExpression(...args: any[]): any;
    function catchClause(...args: any[]): any;
    function classBody(...args: any[]): any;
    function classDeclaration(...args: any[]): any;
    function classExpression(...args: any[]): any;
    function classImplements(...args: any[]): any;
    function classMethod(...args: any[]): any;
    function classProperty(...args: any[]): any;
    function clone(node: any): any;
    function cloneDeep(node: any): any;
    function cloneWithoutLoc(node: any): any;
    function conditionalExpression(...args: any[]): any;
    function continueStatement(...args: any[]): any;
    const createTypeAnnotationBasedOnTypeof: any;
    const createUnionTypeAnnotation: any;
    function debuggerStatement(...args: any[]): any;
    function declareClass(...args: any[]): any;
    function declareExportDeclaration(...args: any[]): any;
    function declareFunction(...args: any[]): any;
    function declareInterface(...args: any[]): any;
    function declareModule(...args: any[]): any;
    function declareModuleExports(...args: any[]): any;
    function declareOpaqueType(...args: any[]): any;
    function declareTypeAlias(...args: any[]): any;
    function declareVariable(...args: any[]): any;
    function decorator(...args: any[]): any;
    function directive(...args: any[]): any;
    function directiveLiteral(...args: any[]): any;
    function doExpression(...args: any[]): any;
    function doWhileStatement(...args: any[]): any;
    function emptyStatement(...args: any[]): any;
    function emptyTypeAnnotation(...args: any[]): any;
    function ensureBlock(node: any, ...args: any[]): any;
    function existentialTypeParam(...args: any[]): any;
    function exportAllDeclaration(...args: any[]): any;
    function exportDefaultDeclaration(...args: any[]): any;
    function exportDefaultSpecifier(...args: any[]): any;
    function exportNamedDeclaration(...args: any[]): any;
    function exportNamespaceSpecifier(...args: any[]): any;
    function exportSpecifier(...args: any[]): any;
    function expressionStatement(...args: any[]): any;
    function file(...args: any[]): any;
    function forAwaitStatement(...args: any[]): any;
    function forInStatement(...args: any[]): any;
    function forOfStatement(...args: any[]): any;
    function forStatement(...args: any[]): any;
    function functionDeclaration(...args: any[]): any;
    function functionExpression(...args: any[]): any;
    function functionTypeAnnotation(...args: any[]): any;
    function functionTypeParam(...args: any[]): any;
    function genericTypeAnnotation(...args: any[]): any;
    const getBindingIdentifiers: any;
    const getOuterBindingIdentifiers: any;
    function identifier(...args: any[]): any;
    function ifStatement(...args: any[]): any;
    function importDeclaration(...args: any[]): any;
    function importDefaultSpecifier(...args: any[]): any;
    function importNamespaceSpecifier(...args: any[]): any;
    function importSpecifier(...args: any[]): any;
    function inheritInnerComments(child: any, parent: any): void;
    function inheritLeadingComments(child: any, parent: any): void;
    function inheritTrailingComments(child: any, parent: any): void;
    function inherits(child: any, parent: any): any;
    function inheritsComments(child: any, parent: any): any;
    function interfaceDeclaration(...args: any[]): any;
    function interfaceExtends(...args: any[]): any;
    function intersectionTypeAnnotation(...args: any[]): any;
    function is(type: any, node: any, opts: any): any;
    function isAnyTypeAnnotation(node: any, opts: any): any;
    function isArrayExpression(node: any, opts: any): any;
    function isArrayPattern(node: any, opts: any): any;
    function isArrayTypeAnnotation(node: any, opts: any): any;
    function isArrowFunctionExpression(node: any, opts: any): any;
    function isAssignmentExpression(node: any, opts: any): any;
    function isAssignmentPattern(node: any, opts: any): any;
    function isAwaitExpression(node: any, opts: any): any;
    function isBinary(node: any, opts: any): any;
    function isBinaryExpression(node: any, opts: any): any;
    function isBindExpression(node: any, opts: any): any;
    const isBinding: any;
    function isBlock(node: any, opts: any): any;
    function isBlockParent(node: any, opts: any): any;
    const isBlockScoped: any;
    function isBlockStatement(node: any, opts: any): any;
    function isBooleanLiteral(node: any, opts: any): any;
    function isBooleanLiteralTypeAnnotation(node: any, opts: any): any;
    function isBooleanTypeAnnotation(node: any, opts: any): any;
    function isBreakStatement(node: any, opts: any): any;
    function isCallExpression(node: any, opts: any): any;
    function isCatchClause(node: any, opts: any): any;
    function isClass(node: any, opts: any): any;
    function isClassBody(node: any, opts: any): any;
    function isClassDeclaration(node: any, opts: any): any;
    function isClassExpression(node: any, opts: any): any;
    function isClassImplements(node: any, opts: any): any;
    function isClassMethod(node: any, opts: any): any;
    function isClassProperty(node: any, opts: any): any;
    function isCompletionStatement(node: any, opts: any): any;
    function isConditional(node: any, opts: any): any;
    function isConditionalExpression(node: any, opts: any): any;
    function isContinueStatement(node: any, opts: any): any;
    function isDebuggerStatement(node: any, opts: any): any;
    function isDeclaration(node: any, opts: any): any;
    function isDeclareClass(node: any, opts: any): any;
    function isDeclareExportDeclaration(node: any, opts: any): any;
    function isDeclareFunction(node: any, opts: any): any;
    function isDeclareInterface(node: any, opts: any): any;
    function isDeclareModule(node: any, opts: any): any;
    function isDeclareModuleExports(node: any, opts: any): any;
    function isDeclareOpaqueType(node: any, opts: any): any;
    function isDeclareTypeAlias(node: any, opts: any): any;
    function isDeclareVariable(node: any, opts: any): any;
    function isDecorator(node: any, opts: any): any;
    function isDirective(node: any, opts: any): any;
    function isDirectiveLiteral(node: any, opts: any): any;
    function isDoExpression(node: any, opts: any): any;
    function isDoWhileStatement(node: any, opts: any): any;
    function isEmptyStatement(node: any, opts: any): any;
    function isEmptyTypeAnnotation(node: any, opts: any): any;
    function isExistentialTypeParam(node: any, opts: any): any;
    function isExportAllDeclaration(node: any, opts: any): any;
    function isExportDeclaration(node: any, opts: any): any;
    function isExportDefaultDeclaration(node: any, opts: any): any;
    function isExportDefaultSpecifier(node: any, opts: any): any;
    function isExportNamedDeclaration(node: any, opts: any): any;
    function isExportNamespaceSpecifier(node: any, opts: any): any;
    function isExportSpecifier(node: any, opts: any): any;
    function isExpression(node: any, opts: any): any;
    function isExpressionStatement(node: any, opts: any): any;
    function isExpressionWrapper(node: any, opts: any): any;
    function isFile(node: any, opts: any): any;
    function isFlow(node: any, opts: any): any;
    function isFlowBaseAnnotation(node: any, opts: any): any;
    function isFlowDeclaration(node: any, opts: any): any;
    function isFor(node: any, opts: any): any;
    function isForAwaitStatement(node: any, opts: any): any;
    function isForInStatement(node: any, opts: any): any;
    function isForOfStatement(node: any, opts: any): any;
    function isForStatement(node: any, opts: any): any;
    function isForXStatement(node: any, opts: any): any;
    function isFunction(node: any, opts: any): any;
    function isFunctionDeclaration(node: any, opts: any): any;
    function isFunctionExpression(node: any, opts: any): any;
    function isFunctionParent(node: any, opts: any): any;
    function isFunctionTypeAnnotation(node: any, opts: any): any;
    function isFunctionTypeParam(node: any, opts: any): any;
    function isGenericTypeAnnotation(node: any, opts: any): any;
    function isIdentifier(node: any, opts: any): any;
    function isIfStatement(node: any, opts: any): any;
    const isImmutable: any;
    function isImport(node: any, opts: any): any;
    function isImportDeclaration(node: any, opts: any): any;
    function isImportDefaultSpecifier(node: any, opts: any): any;
    function isImportNamespaceSpecifier(node: any, opts: any): any;
    function isImportSpecifier(node: any, opts: any): any;
    function isInterfaceDeclaration(node: any, opts: any): any;
    function isInterfaceExtends(node: any, opts: any): any;
    function isIntersectionTypeAnnotation(node: any, opts: any): any;
    function isJSX(node: any, opts: any): any;
    function isJSXAttribute(node: any, opts: any): any;
    function isJSXClosingElement(node: any, opts: any): any;
    function isJSXElement(node: any, opts: any): any;
    function isJSXEmptyExpression(node: any, opts: any): any;
    function isJSXExpressionContainer(node: any, opts: any): any;
    function isJSXIdentifier(node: any, opts: any): any;
    function isJSXMemberExpression(node: any, opts: any): any;
    function isJSXNamespacedName(node: any, opts: any): any;
    function isJSXOpeningElement(node: any, opts: any): any;
    function isJSXSpreadAttribute(node: any, opts: any): any;
    function isJSXSpreadChild(node: any, opts: any): any;
    function isJSXText(node: any, opts: any): any;
    function isLVal(node: any, opts: any): any;
    function isLabeledStatement(node: any, opts: any): any;
    const isLet: any;
    function isLiteral(node: any, opts: any): any;
    function isLogicalExpression(node: any, opts: any): any;
    function isLoop(node: any, opts: any): any;
    function isMemberExpression(node: any, opts: any): any;
    function isMetaProperty(node: any, opts: any): any;
    function isMethod(node: any, opts: any): any;
    function isMixedTypeAnnotation(node: any, opts: any): any;
    function isModuleDeclaration(node: any, opts: any): any;
    function isModuleSpecifier(node: any, opts: any): any;
    function isNewExpression(node: any, opts: any): any;
    function isNode(node: any): any;
    const isNodesEquivalent: any;
    function isNoop(node: any, opts: any): any;
    function isNullLiteral(node: any, opts: any): any;
    function isNullLiteralTypeAnnotation(node: any, opts: any): any;
    function isNullableTypeAnnotation(node: any, opts: any): any;
    function isNumberLiteral(...args: any[]): any;
    function isNumberTypeAnnotation(node: any, opts: any): any;
    function isNumericLiteral(node: any, opts: any): any;
    function isNumericLiteralTypeAnnotation(node: any, opts: any): any;
    function isObjectExpression(node: any, opts: any): any;
    function isObjectMember(node: any, opts: any): any;
    function isObjectMethod(node: any, opts: any): any;
    function isObjectPattern(node: any, opts: any): any;
    function isObjectProperty(node: any, opts: any): any;
    function isObjectTypeAnnotation(node: any, opts: any): any;
    function isObjectTypeCallProperty(node: any, opts: any): any;
    function isObjectTypeIndexer(node: any, opts: any): any;
    function isObjectTypeProperty(node: any, opts: any): any;
    function isObjectTypeSpreadProperty(node: any, opts: any): any;
    function isOpaqueType(node: any, opts: any): any;
    function isParenthesizedExpression(node: any, opts: any): any;
    function isPattern(node: any, opts: any): any;
    function isProgram(node: any, opts: any): any;
    function isProperty(node: any, opts: any): any;
    function isPureish(node: any, opts: any): any;
    function isQualifiedTypeIdentifier(node: any, opts: any): any;
    const isReferenced: any;
    function isRegExpLiteral(node: any, opts: any): any;
    function isRegexLiteral(...args: any[]): any;
    function isRestElement(node: any, opts: any): any;
    function isRestProperty(node: any, opts: any): any;
    function isReturnStatement(node: any, opts: any): any;
    function isScopable(node: any, opts: any): any;
    const isScope: any;
    function isSequenceExpression(node: any, opts: any): any;
    const isSpecifierDefault: any;
    function isSpreadElement(node: any, opts: any): any;
    function isSpreadProperty(node: any, opts: any): any;
    function isStatement(node: any, opts: any): any;
    function isStringLiteral(node: any, opts: any): any;
    function isStringLiteralTypeAnnotation(node: any, opts: any): any;
    function isStringTypeAnnotation(node: any, opts: any): any;
    function isSuper(node: any, opts: any): any;
    function isSwitchCase(node: any, opts: any): any;
    function isSwitchStatement(node: any, opts: any): any;
    function isTaggedTemplateExpression(node: any, opts: any): any;
    function isTemplateElement(node: any, opts: any): any;
    function isTemplateLiteral(node: any, opts: any): any;
    function isTerminatorless(node: any, opts: any): any;
    function isThisExpression(node: any, opts: any): any;
    function isThisTypeAnnotation(node: any, opts: any): any;
    function isThrowStatement(node: any, opts: any): any;
    function isTryStatement(node: any, opts: any): any;
    function isTupleTypeAnnotation(node: any, opts: any): any;
    function isType(nodeType: any, targetType: any): any;
    function isTypeAlias(node: any, opts: any): any;
    function isTypeAnnotation(node: any, opts: any): any;
    function isTypeCastExpression(node: any, opts: any): any;
    function isTypeParameter(node: any, opts: any): any;
    function isTypeParameterDeclaration(node: any, opts: any): any;
    function isTypeParameterInstantiation(node: any, opts: any): any;
    function isTypeofTypeAnnotation(node: any, opts: any): any;
    function isUnaryExpression(node: any, opts: any): any;
    function isUnaryLike(node: any, opts: any): any;
    function isUnionTypeAnnotation(node: any, opts: any): any;
    function isUpdateExpression(node: any, opts: any): any;
    function isUserWhitespacable(node: any, opts: any): any;
    const isValidIdentifier: any;
    const isVar: any;
    function isVariableDeclaration(node: any, opts: any): any;
    function isVariableDeclarator(node: any, opts: any): any;
    function isVoidTypeAnnotation(node: any, opts: any): any;
    function isWhile(node: any, opts: any): any;
    function isWhileStatement(node: any, opts: any): any;
    function isWithStatement(node: any, opts: any): any;
    function isYieldExpression(node: any, opts: any): any;
    function jSXAttribute(...args: any[]): any;
    function jSXClosingElement(...args: any[]): any;
    function jSXElement(...args: any[]): any;
    function jSXEmptyExpression(...args: any[]): any;
    function jSXExpressionContainer(...args: any[]): any;
    function jSXIdentifier(...args: any[]): any;
    function jSXMemberExpression(...args: any[]): any;
    function jSXNamespacedName(...args: any[]): any;
    function jSXOpeningElement(...args: any[]): any;
    function jSXSpreadAttribute(...args: any[]): any;
    function jSXSpreadChild(...args: any[]): any;
    function jSXText(...args: any[]): any;
    function labeledStatement(...args: any[]): any;
    function logicalExpression(...args: any[]): any;
    function memberExpression(...args: any[]): any;
    function metaProperty(...args: any[]): any;
    function mixedTypeAnnotation(...args: any[]): any;
    function newExpression(...args: any[]): any;
    function noop(...args: any[]): any;
    function nullLiteral(...args: any[]): any;
    function nullLiteralTypeAnnotation(...args: any[]): any;
    function nullableTypeAnnotation(...args: any[]): any;
    function numberLiteral(...args: any[]): any;
    function numberTypeAnnotation(...args: any[]): any;
    function numericLiteral(...args: any[]): any;
    function numericLiteralTypeAnnotation(...args: any[]): any;
    function objectExpression(...args: any[]): any;
    function objectMethod(...args: any[]): any;
    function objectPattern(...args: any[]): any;
    function objectProperty(...args: any[]): any;
    function objectTypeAnnotation(...args: any[]): any;
    function objectTypeCallProperty(...args: any[]): any;
    function objectTypeIndexer(...args: any[]): any;
    function objectTypeProperty(...args: any[]): any;
    function objectTypeSpreadProperty(...args: any[]): any;
    function opaqueType(...args: any[]): any;
    function parenthesizedExpression(...args: any[]): any;
    function prependToMemberExpression(member: any, prepend: any): any;
    function program(...args: any[]): any;
    function qualifiedTypeIdentifier(...args: any[]): any;
    namespace react {
        function buildChildren(node: any): any;
        function isCompatTag(tagName: any): any;
        function isReactComponent(member: any): any;
    }
    function regExpLiteral(...args: any[]): any;
    function regexLiteral(...args: any[]): any;
    function removeComments(node: any): any;
    function removeProperties(node: any, opts: any): void;
    function removePropertiesDeep(tree: any, opts: any): any;
    const removeTypeDuplicates: any;
    function restElement(...args: any[]): any;
    function restProperty(...args: any[]): any;
    function returnStatement(...args: any[]): any;
    function sequenceExpression(...args: any[]): any;
    function shallowEqual(actual: any, expected: any): any;
    function spreadElement(...args: any[]): any;
    function spreadProperty(...args: any[]): any;
    function stringLiteral(...args: any[]): any;
    function stringLiteralTypeAnnotation(...args: any[]): any;
    function stringTypeAnnotation(...args: any[]): any;
    function switchCase(...args: any[]): any;
    function switchStatement(...args: any[]): any;
    function taggedTemplateExpression(...args: any[]): any;
    function templateElement(...args: any[]): any;
    function templateLiteral(...args: any[]): any;
    function thisExpression(...args: any[]): any;
    function thisTypeAnnotation(...args: any[]): any;
    function throwStatement(...args: any[]): any;
    const toBindingIdentifierName: any;
    const toBlock: any;
    const toComputedKey: any;
    const toExpression: any;
    const toIdentifier: any;
    const toKeyAlias: any;
    const toSequenceExpression: any;
    const toStatement: any;
    function traverseFast(node: any, enter: any, opts: any): void;
    function tryStatement(...args: any[]): any;
    function tupleTypeAnnotation(...args: any[]): any;
    function typeAlias(...args: any[]): any;
    function typeAnnotation(...args: any[]): any;
    function typeCastExpression(...args: any[]): any;
    function typeParameter(...args: any[]): any;
    function typeParameterDeclaration(...args: any[]): any;
    function typeParameterInstantiation(...args: any[]): any;
    function typeofTypeAnnotation(...args: any[]): any;
    function unaryExpression(...args: any[]): any;
    function unionTypeAnnotation(...args: any[]): any;
    function updateExpression(...args: any[]): any;
    function validate(node: any, key: any, val: any): void;
    const valueToNode: any;
    function variableDeclaration(...args: any[]): any;
    function variableDeclarator(...args: any[]): any;
    function voidTypeAnnotation(...args: any[]): any;
    function whileStatement(...args: any[]): any;
    function withStatement(...args: any[]): any;
    function yieldExpression(...args: any[]): any;
}
export namespace util {
    function arrayify(val: any, mapFn: any): any;
    function booleanify(val: any): any;
    function canCompile(filename: any, altExts: any): any;
    namespace canCompile {
        const EXTENSIONS: string[];
    }
    const inherits: any;
    const inspect: any;
    function list(val: any): any;
    function regexify(val: any): any;
    function shouldIgnore(filename: any, ...args: any[]): any;
}
export const version: any;
