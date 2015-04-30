# python kotor untuk generate heat.less
# TODO bersihkan duplikasi + bikin yang lebih rapi

# analisis
for i in range(1, 5):
	print ".heat-{}00 {{ .heat-single(@ca{}); }}".format(i, i)

# gabungan
for i in range(1, 5):
	print ".heat-0{}0 {{ .heat-single(@cg{}); }}".format(i, i)

# teori
for i in range(1, 5):
	print ".heat-00{} {{ .heat-single(@ct{}); }}".format(i, i)
	
# analisis + gabungan
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-{}{}0 {{ .heat-dual(@ca{}, @cg{}); }}".format(i, j, i, j)
		print ".heat-{}{}0 {{ .heat-dual(@cg{}, @ca{}); }}".format(j, i, j, i)

# analisis + teori
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-{}0{} {{ .heat-dual(@ca{}, @ct{}); }}".format(i, j, i, j)
		print ".heat-{}0{} {{ .heat-dual(@ct{}, @ca{}); }}".format(j, i, j, i)
		
# gabungan + teori
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-0{}{} {{ .heat-dual(@cg{}, @ct{}); }}".format(i, j, i, j)
		print ".heat-0{}{} {{ .heat-dual(@ct{}, @cg{}); }}".format(j, i, j, i)