module.exports = function(babel) {
    const { types: t } = babel;

    return {
        visitor: {
            TryStatement(path) {
                const catchClause = path.node.handler;

                // catch가 존재하고, 그 안에 Sentry 로그가 없을 경우에만 추가
                if (catchClause && !hasSentryLog(catchClause.body)) {
                    const errorIdentifier = catchClause.param.name; // catch (error)의 변수명 추출

                    // Sentry.captureException 호출을 추가
                    const sentryLogStatement = t.expressionStatement(
                        t.callExpression(
                            t.memberExpression(t.identifier('Sentry'), t.identifier('captureException')),
                            [t.identifier(errorIdentifier)]
                        )
                    );

                    // catch 블록의 첫 번째 줄에 Sentry 로그 추가
                    catchClause.body.body.unshift(sentryLogStatement);
                }
            }
        }
    };

    // Sentry.captureException이 있는지 확인하는 함수
    function hasSentryLog(body) {
        return body.body.some(statement => {
            return t.isExpressionStatement(statement) &&
                t.isCallExpression(statement.expression) &&
                t.isMemberExpression(statement.expression.callee) &&
                statement.expression.callee.object.name === 'Sentry' &&
                statement.expression.callee.property.name === 'captureException';
        });
    }
};
