function RequestsList({ requests, onClaimRequest }) {
  return (
    <div className="card">
      <h2>Active Buy Requests</h2>

      {/* Desktop Table View */}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>AI Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => {
            const recommendation = req.recommendations?.[0];
            return (
              <tr key={req.id || req._id}>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>{req.delivery}</td>
                <td className={req.status === "Open" ? "open" : "claimed"}>
                  {req.status}
                </td>
                <td>
                  {recommendation ? (
                    <div className="ai-recommendation">
                      <div className="ai-badge">
                        <span className="ai-icon">✨</span>
                        <span className="ai-text">
                          {recommendation.confidenceScore}% match
                        </span>
                      </div>
                      <div className="ai-tooltip">
                        <div className="ai-supplier">{recommendation.supplierName}</div>
                        <div className="ai-details">
                          {recommendation.fulfillmentCount} past orders • {recommendation.reliabilityScore}★ rating
                        </div>
                        <div className="ai-reason">
                          Based on delivery history and locality
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="no-recommendation">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="requests-cards">
        {requests.map((req) => {
          const recommendation = req.recommendations?.[0];
          return (
            <div key={req.id || req._id} className="request-card">
              <div className="request-card-header">
                <h3 className="request-item">{req.item}</h3>
                <span className={`request-status ${req.status === "Open" ? "open" : "claimed"}`}>
                  {req.status}
                </span>
              </div>
              
              <div className="request-card-details">
                <div className="request-detail">
                  <span className="request-label">Quantity:</span>
                  <span className="request-value">{req.quantity}</span>
                </div>
                <div className="request-detail">
                  <span className="request-label">Delivery:</span>
                  <span className="request-value">{req.delivery}</span>
                </div>
                
                {recommendation && (
                  <div className="request-ai">
                    <div className="ai-badge">
                      <span className="ai-icon">✨</span>
                      <span className="ai-text">
                        {recommendation.confidenceScore}% match
                      </span>
                    </div>
                    <div className="ai-supplier-small">{recommendation.supplierName}</div>
                  </div>
                )}
              </div>

              {req.status === "Open" && (
                <button 
                  className="claim-button"
                  onClick={() => onClaimRequest(req.id || req._id)}
                >
                  Claim Request
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestsList;
