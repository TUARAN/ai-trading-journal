# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)  # 添加CORS支持

# 新浪接口示例：玻璃主力合约
SINA_FG_URL = 'https://hq.sinajs.cn/list=CF_zczxFG0'

def parse_sina_response(text):
    match = re.search(r'="(.*?)";', text)
    if not match:
        return None
    fields = match.group(1).split(',')
    if len(fields) < 9:
        return None

    return {
        "contract": fields[0],
        "latest_price": float(fields[1]),
        "prev_close": float(fields[2]),
        "open_price": float(fields[3]),
        "high_price": float(fields[4]),
        "low_price": float(fields[5]),
        "volume": int(fields[6]),
        "position": int(fields[7]),
        "update_time": fields[8]
    }

@app.route('/api/glass/price', methods=['GET'])
def get_glass_price():
    try:
        resp = requests.get(SINA_FG_URL)
        resp.encoding = 'gbk'
        data = parse_sina_response(resp.text)
        if data:
            return jsonify({
                'success': True,
                'data': {
                    'price': data['latest_price'],
                    'open': data['open_price'],
                    'high': data['high_price'],
                    'low': data['low_price'],
                    'volume': data['volume'],
                    'date': data['update_time'],
                    'source': 'sina'
                }
            })
        else:
            return jsonify({
                'success': False,
                'error': '解析数据失败'
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/api/glass/history', methods=['GET'])
def get_glass_history():
    """获取玻璃期货历史数据（7月1日到22日）- 模拟数据"""
    try:
        # 返回模拟历史数据
        mock_data = []
        for i in range(1, 23):
            mock_data.append({
                'date': f'202507{i:02d}',
                'price': 1850 + i * 2,
                'open': 1845 + i * 2,
                'high': 1860 + i * 2,
                'low': 1840 + i * 2,
                'volume': 1000 + i * 50
            })
        return jsonify({
            'success': True,
            'data': mock_data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'获取历史数据失败: {str(e)}'
        })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
