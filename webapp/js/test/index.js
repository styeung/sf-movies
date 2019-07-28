var requireTest = require.context('.', true, /_spec\.js$/)
requireTest.keys().forEach(requireTest)