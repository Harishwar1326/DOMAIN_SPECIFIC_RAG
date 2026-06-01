export default function AnswerPanel({ answer, retrievalResult, loading }) {
  // New fields from CRAG and domain-specific features
  const queryType = retrievalResult?.queryType;
  const domain = retrievalResult?.domain;
  const confidence = retrievalResult?.confidence;
  const retrievalStrategy = retrievalResult?.retrievalStrategy;
  const sourceDocuments = retrievalResult?.sourceDocuments || [];
  const cragStatus = retrievalResult?.cragStatus;
  const evaluationMetrics = retrievalResult?.evaluationMetrics;

  return (
    <section className="surface answer-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Response</p>
          <h2>Domain answer</h2>
        </div>
        <p className="panel-copy">
          The answer is built from the retrieved domain context plus the question.
        </p>
      </div>

      {/* Domain and Query Information */}
      <div className="diagnostic-section">
        <div className="document-list__header">
          <h3>Query & Domain Classification</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Query Complexity</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{queryType || '—'}</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Domain</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{domain?.subcategory || '—'}</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Category</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{domain?.category || '—'}</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Confidence</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{typeof confidence === 'number' ? (confidence * 100).toFixed(1) + '%' : '—'}</p>
          </div>
        </div>
      </div>

      {/* CRAG Status */}
      {cragStatus && (
        <div className="diagnostic-section">
          <div className="document-list__header">
            <h3>Corrective RAG (CRAG) Status</h3>
            <span style={{ color: cragStatus.valid ? '#10b981' : '#f59e0b' }}>
              {cragStatus.valid ? 'Valid' : 'Improved'}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Retries</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{cragStatus.retries}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', gridColumn: 'span 2' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Actions</p>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {cragStatus.actions?.map((action, idx) => (
                  <li key={idx} style={{ fontSize: '0.875rem' }}>{action}</li>
                )) || <li>No actions taken</li>}
              </ul>
            </div>
            {cragStatus.issues?.length > 0 && (
              <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', gridColumn: 'span 2' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Issues Detected</p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {cragStatus.issues.map((issue, idx) => (
                    <li key={idx} style={{ fontSize: '0.875rem' }}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Source Documents */}
      {sourceDocuments.length > 0 && (
        <div className="diagnostic-section">
          <div className="document-list__header">
            <h3>Source Documents</h3>
            <span>{sourceDocuments.length} document(s)</span>
          </div>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            {sourceDocuments.map((doc, idx) => (
              <li key={idx} style={{ fontSize: '0.875rem' }}>{doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Answer Box */}
      <div className="answer-box">
        {loading ? (
          <p>Generating answer...</p>
        ) : answer ? (
          <p>{answer}</p>
        ) : (
          <p>Ask a question to see the generated answer here.</p>
        )}
      </div>


    </section>
  );
}
