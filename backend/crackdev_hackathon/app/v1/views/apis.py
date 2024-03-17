from flask import jsonify, request, redirect, abort, current_app
import requests
from app.v1.views import app_look
import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

@app_look.route('/get_skills')
def get_demand_skills():
    """Gets datas from the crackdev api"""
    if request.method == 'GET':
        headers = {
            'api-key': current_app.config['CRACK_DEV_SECRET_KEY']
        }
        url = requests.get('https://api.crackeddevs.com/v1/get-jobs?limit=10', headers=headers)

        data = url.json()

        results = []
        results.append(data)

        skill_data = dict()

        current_date = datetime.now().date()
        prev_date = current_date - relativedelta(months=12)
        
        for count in data:
            created_at = datetime.strptime(count['created_at'].split('T')[0], '%Y-%m-%d').date()
            if prev_date <= created_at <= current_date:
                if created_at not in skill_data:
                    skill_data[created_at] = dict()

                for skills in count['technologies']:
                    if skills in skill_data[created_at]:
                        skill_data[created_at][skills] += 1
                    else:
                        skill_data[created_at][skills] = 1
                        
        current_skills = []
        current_date_data = skill_data.get(current_date, {})
        for skill, count in current_date_data.items():
            current_skills.append({'name': skill, 'count': count})
        results.append({'date': str(current_date), 'skills': current_skills, 'count': len(current_skills)})

        date = current_date - timedelta(days=1)
        skill_list = []
        while date >= prev_date:
            date_data = skill_data.get(date, {})
            for key, val in date_data.items():
                skill_list.append({'name': key, 'count': val})
            results.append({'date': str(date), 'skills': skill_list, 'count': len(skill_list)})
            date -= timedelta(days=1)
        # for i, j in skill_data.items():
        #     skills_list = []
        #     sorted_skills = sorted(j.items(), key=lambda x: x[1], reverse=True)
        #     for skill, count in sorted_skills:        
        #         skills_list.append({'name':skill, 'count': count})
        #     results.append({'date': str(i), 'skills': skills_list, 'count': len(skills_list)})
        return jsonify(results), 200
    
@app_look.route('/get_location')
def locations():
    pass

@app_look.route('/get_loci')
def loci():
    pass