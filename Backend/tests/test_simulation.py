import pytest
from services.simulation_ import run_simulation

def test_simulation():
    result = run_simulation("stocks", 10000, 10)
    assert isinstance(result, dict)
    assert "Final Average" in result
    assert result["Final Average"] > 0
