import os, re
import json
import pdb
import collections
from bs4 import BeautifulSoup
from django.utils.text import slugify

sourceLink = 'http://sourceforge.net/p/digitalpali/digitalpali-standalone-old/ci/master/tree/'
source = 'Digital Pali Reader'
works = []

def jaggedListToDict(text):
	node = { str(i): t for i, t in enumerate(text) }
	node = collections.OrderedDict(sorted(node.items()))
	for child in node:
		if isinstance(node[child], list):
			node[child] = jaggedListToDict(node[child])
	return node

def main():
	# Build json docs from txt files
	for root, dirs, files in os.walk("."):
		path = root.split('/')
		print((len(path) - 1) * '---', os.path.basename(root))
		for fname in files:
			if len(path) > 1 and path[1] == 'xml':
				print((len(path)) * '---', fname)
				if fname.endswith('xml'):
					with open(os.path.join(root, fname), encoding='utf-8') as f:
						soup = BeautifulSoup(f.read(), 'html.parser')

					originalTitle = ''
					first_p = soup.p
					if first_p:
						first_p = re.sub(r'\[\d+?\]\.*?', '', first_p.text.replace('.', '')).strip()
						originalTitle = first_p

					first_h = soup.h
					if first_h:
						first_h = re.sub(r'\[\d+?\]\.*?', '', soup.h.text.replace('.', '')).strip()
						originalTitle = first_h

					if first_p and first_h:
						originalTitle = first_p + ": " + first_h

					fname_work = fname.replace('.xml', '')
					title = 'Digital Pali Reader ' + fname_work.title()

					work = {
						'originalTitle': originalTitle.title(),
						'englishTitle': title,
						'author': 'Not available',
						'source': source,
						'sourceLink': sourceLink,
						'language': 'pali',
						'text': {},
					}

					# I don't know enough about Pali to parse these texts very well
					# in their h0, h1, h2, h3, h4 structure.
					# so for now, I will just parse them in a flat node structure

					text = []
					for node in soup.body.strings:
						if len(node.strip()):
							text.append(node)

					work['text'] = jaggedListToDict(text)
					works.append(work)



	for work in works:
		fname = slugify(work['source']) + '__' + slugify(work['englishTitle'][0:100]) + '__' + slugify(work['language']) + '.json'
		fname = fname.replace(" ", "")
		if not os.path.exists('cltk_json'):
			os.makedirs('cltk_json')
		with open('cltk_json/' + fname, 'w') as f:
			json.dump(work, f)

if __name__ == '__main__':
	main()
