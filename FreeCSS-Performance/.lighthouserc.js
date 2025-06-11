// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://yolo-cat.github.io/1132-WEB-FreeCSS-Performance/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-report',
      reportFilenamePattern: 'index.html',
      output: ['html']
    },
  },
};
