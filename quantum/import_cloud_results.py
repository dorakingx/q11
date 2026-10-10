"""Import REAL recorded cloud runs (reports/qollab-runs/*.json) into fixtures/cloud-results.json.
The web build shows them as "Cached cloud result". Never run this on anything that was not actually executed."""
import glob, json, sys
sys.path.insert(0, 'qollab')
from q11 import circuits

records = []
for f in sorted(glob.glob('reports/qollab-runs/*.json')):
    r = json.load(open(f))
    assert sum(r['counts'].values()) == r['shots'], f
    a = circuits.analyze_counts(r['counts'], r['missionId'], r['correction'], r['readoutBasis'], r['prep'])
    pred = a.pop('prediction')
    records.append({
        'source': 'cached-cloud', 'backendName': r['backendName'], 'missionId': r['missionId'], 'correction': r['correction'],
        'shots': r['shots'], 'counts': r['counts'],
        'analysis': {
            'dominantSyndrome': a['dominantSyndrome'], 'predictedSyndromeShare': a['predictedSyndromeShare'],
            'logicalHistograms': a['logicalHistograms'], 'predictedLogicalShare': a['predictedLogicalShare'],
            'dominantMatches': a['dominantMatches'], 'exactMatchesIdealModel': a['matches'],
            'dataCheckOddFraction': a['dataCheckOddFraction'], 'readoutBasis': r['readoutBasis'], 'prep': r['prep'],
            'platform': r['platform'], 'circuitExecutionMs': r['circuitExecutionMs'], 'endToEndSeconds': r['endToEndSeconds'],
        },
        'prediction': {k: pred[k] for k in ('syndrome', 'residual', 'verdict', 'logicalFlip', 'referenceCorrection', 'referenceVerdict', 'equivalentToReference')},
        'jobId': r['jobId'], 'startedAt': r['startedAt'], 'finishedAt': r['finishedAt'],
    })
    print(f, '->', r['missionId'], r['jobId'][:8], 'dominantMatches', a['dominantMatches'], 'synShare', a['predictedSyndromeShare'], 'logShare', a['predictedLogicalShare'])
out = {'schema': 1, 'note': 'Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.', 'results': records}
json.dump(out, open('fixtures/cloud-results.json', 'w'), indent=2, sort_keys=True); open('fixtures/cloud-results.json', 'a').write('\n')
print('fixtures/cloud-results.json:', len(records), 'records')
