function createMenuData(data) {
  
	const p =[];
    
	//loops through data 
	for (i = 0; i < data.length; i++)
	{
		// splits parent and child values using'/'
		var line = data[i].split('/');
      
		//check if parent is already within data
		if (p.some(p => p.title == line[0]))
		{
			//chances values for child array and adds to data
			var r1 = p.find(p => p.title == line[0]);
			r1.data.push(line[1]);
			(p => p.title == line[0]).data = r1.data;
		}
		else
		{
			//added parents to array if child found note: parent 4 not added because of no child
			if (typeof line[1] !== 'undefined')
			{
				p.push({title:line[0], data:[line[1]]});
 
			}
		}
      
	}
	return p;

}

describe('menu Data Generator', () => {
	it('creates correct data structure ', () => {
		const data = [
			'parent1/parent1child',
			'parent1/parent1child2',
			'parent2/parent2child',
			'parent2/parent2child2',
			'parent1/parent1child3',
			'parent3',
			'parent3/parent3child1',
			'parent4'
		];
  
		const expectedResult = [
			{
				title: 'parent1',
				data: ['parent1child', 'parent1child2', 'parent1child3']
			},
			{ title: 'parent2', data: ['parent2child', 'parent2child2'] },
			{ title: 'parent3', data: ['parent3child1'] }
		];
  
		const actualResult = createMenuData(data);
		expect(actualResult).toMatchObject(expectedResult);
	});
});