import dash_responsive_grid_layout as drgl
import dash
from dash.dependencies import Input, Output
import dash_core_components as dcc
import dash_html_components as html
import json

app = dash.Dash('')

app.scripts.config.serve_locally = True

layouts = {
    'lg': [
        {'i': 'a', 'x': 0, 'y': 0, 'w': 1, 'h': 2, 'static': False},
        {'i': 'b', 'x': 1, 'y': 0, 'w': 1, 'h': 2, 'minW': 1, 'maxW': 2},
        {'i': 'c', 'x': 2, 'y': 0, 'w': 1, 'h': 2}
    ],
    'sm': [
        {'i': 'a', 'x': 0, 'y': 0, 'w': 1, 'h': 2, 'static': False},
        {'i': 'b', 'x': 1, 'y': 0, 'w': 1, 'h': 2, 'minW': 1, 'maxW': 2},
        {'i': 'c', 'x': 2, 'y': 0, 'w': 1, 'h': 2}
    ]
}

style = { 'borderStyle': 'solid', 'height': '100%' }
cols = { 'lg': 3, 'sm': 1 }
breakpoints = { 'lg': 1200, 'sm': 460}


# app.layout = html.Div([drgl.GridLayout([
#     html.Div('a', key='a', style=style),
#     html.Div('b', key='b', style=style),
#     html.Div('c', key='c', style=style),
# ], layout=layout, rowHeight=30, width=1200
# )])


# app.layout = html.Div([drgl.ResponsiveGridLayout([
#     html.Div('a', key='a', style=style),
#     html.Div('b', key='b', style=style),
#     html.Div('c', key='c', style=style),
# ], cols=cols, layout=layout
# )])

app.layout = html.Div([
    drgl.ResponsiveGridLayout(
        [
            dcc.Graph(
                id='a',
                figure={
                    'data': [
                        {
                            'x': [1, 2, 3, 4],
                            'y': [4, 1, 3, 5],
                            'text': ['a', 'b', 'c', 'd'],
                            'customdata': ['c.a', 'c.b', 'c.c', 'c.d'],
                            'name': 'Trace 1',
                            'mode': 'markers',
                            'marker': {'size': 12}
                            },
                        {
                            'x': [1, 2, 3, 4],
                            'y': [9, 4, 1, 4],
                            'text': ['w', 'x', 'y', 'z'],
                            'customdata': ['c.w', 'c.x', 'c.y', 'c.z'],
                            'name': 'Trace 2',
                            'mode': 'markers',
                            'marker': {'size': 12}
                            }
                        ]
                    },
                config={
                    'autosizable': True
                    },
                style=style
            ),
            html.Div([
                html.H1('HELLO WORLD', id='b-h1'),
                dcc.Graph(
                    id='b-graph',
                    figure={
                        'data':                                                     [
                            {'x': [1, 2, 3], 'y': [4, 1, 2], 'type': 'bar', 'name': 'SF'},
                            {'x': [1, 2, 3], 'y': [2, 4, 5], 'type': 'bar', 'name': u'Montréal'},
                            ],
                        'layout': {
                            'title': 'Dash Data Visualization'
                            }
                        },
                    config={
                        'autosizable': True,
                        'doubleClick': 'autosize',
                        'frameMargins': 0,
                        },
                )
            ], key='b', id='b-div', style=style)
        ],
        id='grid-layout',
        cols=cols, 
        layouts=layouts,
        breakpoints=breakpoints,
        draggableHandle='titlebar'   
    ), #drgl.GridLayout
    html.Div('hi', id='data-node')
]) #html.Div

@app.callback(
    Output('data-node', 'children'),
    [Input('grid-layout', 'layouts')])
def myfunc(lay):
    print(lay)
    return json.dumps(lay)

if __name__ == '__main__':
    app.run_server(debug=True)
